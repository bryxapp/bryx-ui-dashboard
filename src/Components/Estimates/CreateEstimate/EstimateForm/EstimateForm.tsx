import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Typography } from 'antd';
import { getEstimateDraft } from '../../../../utils/api/estimate-drafts-api';
import { getTemplate } from '../../../../utils/api/templates-api';
import { InputObj, InputType, InputTypes, ShapeObj } from '../../../../utils/types/CanvasInterfaces';
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
    const [inputObjects, setInputObjects] = useState<InputObj[]>([]);
    const [error, setError] = useState(false); // Error state
    const { getAccessToken } = useAuth0User();

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                if (!templateId) return;
                const token = await getAccessToken();
                if (!token) return;
                const fetchedTemplate = await getTemplate(templateId, token);
                setTemplateData(fetchedTemplate);
                let tempInputObjects: InputObj[] = [];
                let tempFormInputs: { [id: string]: EstimateFormField } = {};
                fetchedTemplate.canvasDesign.Shapes.forEach((shape: ShapeObj) => {
                    // Check if the shape's type is a key in the InputTypes object.
                    if (InputTypes.includes(shape.type as InputType)) {
                        // Cast shape to InputObj and add to formInputs array.
                        tempInputObjects.push(shape as InputObj);
                        // Create a new EstimateFormField object and add to formInputs dictionary.
                        tempFormInputs[shape.id] = {
                            inputObjId: shape.id,
                            type: shape.type as InputType,
                            value: ""
                        };
                    }
                });
                setInputObjects(tempInputObjects);
                let newFieldValues: EstimateFormFields = {};
                if (draftId) {
                    await fetchDraft(newFieldValues, token);
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
            const draftFieldValues = fetchedEstimateDraft.filledFields; //fieldvalues object saved from the last draft
            //loop through the draft fieldvalues and update the current fieldvalues with the draft fieldvalues
            let missingKeys: string[] = [];
            Object.keys(draftFieldValues).forEach((key) => {
                if (!currentFormFields.hasOwnProperty(key)) {
                    missingKeys.push(key);
                }
                else {
                    currentFormFields[key] = draftFieldValues[key];
                }
            });
            setFormInputs(currentFormFields);
            if (missingKeys.length > 0) {
                alert("There were fields in the draft that are no longer in the template.")
            }
        }

        fetchTemplate();
    }, [draftId, templateId, getAccessToken]);

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
                <div style={{ flex: 3 }}>
                    <Form
                        layout="vertical"
                        style={{ width: "60%" }}
                    >
                        <EstimateName estimateName={estimateName} setEstimateName={setEstimateName} />
                        < Typography.Text type="secondary">
                            Template: {templateData.friendlyName}
                        </Typography.Text>
                        <EstimateFormTextFieldsList
                            inputObjects={inputObjects}
                            formInputs={formInputs}
                            setFormInputs={setFormInputs}
                        />
                        <div style={{ display: 'flex' }}>
                            <SubmitButton templateData={templateData} estimateName={estimateName} formInputs={formInputs} draftId={draftId} setCreating={setCreating} />
                            <span style={{ width: 20 }}></span>
                            <SaveAsDraftButton templateData={templateData} estimateName={estimateName} formInputs={formInputs} draftId={draftId} setSaving={setSaving} />
                        </div>
                    </Form>
                </div>

                <div style={{ flex: 1 }}>
                    <PreviewStage canvasDesign={templateData.canvasDesign} />
                </div>
            </div>
        </>
    );
};

export default EstimateForm;
