import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Form, Typography, notification } from 'antd';
import { getEstimateDraft } from '../../../../utils/api/estimate-drafts-api';
import { getTemplate } from '../../../../utils/api/templates-api';
import { InputObj, InputType } from '../../../../utils/types/CanvasInterfaces';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { EstimateFormField, EstimateFormFields } from '../../../../utils/types/EstimateInterfaces';
import Creating from '../../../SharedComponents/Creating/Creating';
import EstimateName from './EstimateName/EstimateName';
import Loading from '../../../SharedComponents/Loading/Loading';
import PreviewStage from './TemplatePreview/TemplatePreview';
import Saving from '../../../SharedComponents/Saving/Saving';
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import SubmitButton from './SubmitButton/SubmitButton';
import SaveAsDraftButton from './SaveDraftButton/SaveDraftButton';
import EstimateFormTextFieldsList from './EstimateFormTextFields/EstimateFromTextFieldsList';
import logger from '../../../../logging/logger';
import ErrorMessage from '../../../SharedComponents/ErrorMessage/ErrorMessage';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';
import { findShape } from '../../../../utils/shapeManagementUtils';
import { TbEdit } from "react-icons/tb";
import EditingEstimateFormTextFieldsList from './EstimateFormTextFields/EditingList/EditingEstimateFromTextFieldsList';

const EstimateForm = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const templateId = params.get('templateId');
    const draftId = params.get('draftId') || "";

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [saving, setSaving] = useState(false);
    const [templateData, setTemplateData] = useState<TemplateData>();
    const [estimateName, setEstimateName] = useState("New Estimate");
    const [formInputs, setFormInputs] = useState<EstimateFormFields>({});
    const { setCanvasDesign } = useCanvasDesignContext();
    const [error, setError] = useState(false); // Error state
    const { getAccessToken } = useAuth0User();

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                setLoading(true);
                if (!templateId) return;
                const token = await getAccessToken();
                if (!token) return;
                const fetchedTemplate = await getTemplate(templateId, token);
                setTemplateData(fetchedTemplate);
                setCanvasDesign(fetchedTemplate.canvasDesign);
                let tempFormInputs: { [id: string]: EstimateFormField } = {};
                fetchedTemplate.canvasDesign.inputOrder.forEach((inputObjId: string) => {
                    // Create a new EstimateFormField object and add to formInputs dictionary.
                    const inputShape = findShape(fetchedTemplate.canvasDesign, inputObjId) as InputObj;
                    tempFormInputs[inputShape.id] = {
                        inputObjId: inputShape.id,
                        type: inputShape.type as InputType,
                        value: ""
                    };
                }
                );
                if (draftId) {
                    await fetchDraft(tempFormInputs, token);
                }
                else {
                    setFormInputs(tempFormInputs);
                }
            }
            catch (error) {
                logger.trackException({
                    properties: {
                        name: "Estimate Form Error",
                        page: "Estimate Form",
                        description: "Error fetching template",
                        error: error,
                    },
                });
                setError(true);
                console.error("Error fetching template:", error);
            }
            finally {
                setLoading(false);
            }
        }

        const fetchDraft = async (currentFormFields: EstimateFormFields, token: string) => {
            const fetchedEstimateDraft = await getEstimateDraft(draftId, token);
            setEstimateName(fetchedEstimateDraft.estimateName);
            const draftFieldValues = fetchedEstimateDraft.formInputs; //fieldvalues object saved from the last draft
            //loop through the draft fieldvalues and update the current fieldvalues with the draft fieldvalues
            let missingKeys: string[] = [];
            Object.keys(draftFieldValues).forEach((key) => {
                if (currentFormFields.hasOwnProperty(key)) {
                    currentFormFields[key] = draftFieldValues[key];
                }
                else {
                    missingKeys.push(key);
                }
            });
            setFormInputs(currentFormFields);
            if (missingKeys.length > 0) {
                notification.warning({
                    message: 'Missing Fields',
                    description: 'There were fields in the draft that are no longer in the template.'
                });
            }
        }

        fetchTemplate();
    }, [draftId, templateId, getAccessToken, setCanvasDesign]);

    const [editing, setEditing] = useState(false);
    const handleEnableOrderEditing = () => {
        setEditing(true);
    }

    if (loading) return <Loading />

    if (creating) return <Creating />

    if (saving) return <Saving />

    if (error) return <ErrorMessage dataName="Template" />

    if (!templateData) return (<div>Template not found</div>);

    return (
        <>
            <Typography.Title level={3}>
                Create Estimate
            </Typography.Title>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 2 }}>
                    <Button type="link" onClick={handleEnableOrderEditing}><TbEdit /></Button>
                    <Form
                        layout="vertical"
                        style={{ width: "80%" }}>
                        <EstimateName estimateName={estimateName} setEstimateName={setEstimateName} />
                        < Typography.Text type="secondary">
                            Template: {templateData.friendlyName}
                        </Typography.Text>
                        {!editing && (
                            <EstimateFormTextFieldsList
                                formInputs={formInputs}
                                setFormInputs={setFormInputs}
                            />
                        )}
                        {editing && (
                            <EditingEstimateFormTextFieldsList />
                        )}
                        <div style={{ display: 'flex' }}>
                            <SubmitButton templateData={templateData} estimateName={estimateName} formInputs={formInputs} draftId={draftId} setCreating={setCreating} />
                            <span style={{ width: 20 }}></span>
                            <SaveAsDraftButton templateData={templateData} estimateName={estimateName} formInputs={formInputs} draftId={draftId} setSaving={setSaving} />
                        </div>
                    </Form>
                </div>
                <div style={{ flex: 1 }}>
                    <PreviewStage canvasDesign={templateData.canvasDesign} formInputs={formInputs} />
                </div>
            </div>
        </>
    );
};

export default EstimateForm;
