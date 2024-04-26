import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, notification } from 'antd';
import { getEstimateDraft } from '../../../../utils/api/estimate-drafts-api';
import { getTemplate } from '../../../../utils/api/templates-api';
import { InputObj, InputType, TableInputObj } from '../../../../utils/types/CanvasInterfaces';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { EstimateFormField, EstimateFormFields } from '../../../../utils/types/EstimateInterfaces';
import Creating from '../../../SharedComponents/Creating/Creating';
import Loading from '../../../SharedComponents/Loading/Loading';
import PreviewStage from './TemplatePreview/TemplatePreview';
import Saving from '../../../SharedComponents/Saving/Saving';
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import logger from '../../../../logging/logger';
import ErrorMessage from '../../../SharedComponents/ErrorMessage/ErrorMessage';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';
import { findShape, isInputObject, isTableObject } from '../../../../utils/shapeManagementUtils';
import EstimateForm from './EstimateForm';

const { Title } = Typography;

const CreateEstimate = () => {
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
                    const shapeObj = findShape(fetchedTemplate.canvasDesign, inputObjId);
                    if (!shapeObj) return;
                    if (isInputObject(shapeObj)) {
                        const inputShape = shapeObj as InputObj;
                        tempFormInputs[inputShape.id] = {
                            inputObjId: inputShape.id,
                            type: inputShape.type as InputType,
                            value: ""
                        };
                    }
                    if (isTableObject(shapeObj)) {
                        const tableShape = shapeObj as TableInputObj;
                        tableShape.rows.forEach(row => {
                            row.forEach(cell => {
                                if (cell.content && cell.content.type === 'CellInput') {
                                    tempFormInputs[cell.id] = {
                                        inputObjId: cell.id,
                                        type: 'CellInput',
                                        value: ""
                                    };
                                }
                            });
                        });
                    }
                });
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
        };

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
        };

        fetchTemplate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draftId, templateId]);

    if (loading) return <Loading />;

    if (creating) return <Creating />;

    if (saving) return <Saving />;

    if (error) return <ErrorMessage dataName="Template" />;

    if (!templateData) return <div>Template not found</div>;

    return (
        <>
            <Title level={3}>Create Estimate</Title>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 3 }}>
                    <EstimateForm
                        templateData={templateData}
                        setCreating={setCreating}
                        setSaving={setSaving}
                        draftId={draftId}
                        estimateName={estimateName}
                        setEstimateName={setEstimateName}
                        formInputs={formInputs}
                        setFormInputs={setFormInputs}
                    />
                </div>
                <div style={{ flex: 2 }}>
                    <PreviewStage canvasDesign={templateData.canvasDesign} formInputs={formInputs} />
                </div>
            </div>
        </>
    );
};

export default CreateEstimate;
