import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { getEstimateDraft } from '../../../../utils/api/estimate-drafts-api';
import { getTemplate } from '../../../../utils/api/templates-api';
import { ShapeObj, TextInputObj } from '../../../../utils/types/CanvasInterfaces';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { EstimateFormFields } from '../../../../utils/types/EstimateInterfaces';
import Creating from '../../../SharedComponents/Creating/Creating';
import EstimateName from './EstimateName/EstimateName';
import Loading from '../../../SharedComponents/Loading/Loading';
import PreviewStage from './TemplatePreview/TemplatePreview';
import Saving from '../../../SharedComponents/Saving/Saving';
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import SubmitButton from './SubmitButton/SubmitButton';
import SaveAsDraftButton from './SaveDraftButton/SaveDraftButton';
import EstimateFormTextFieldsList from './EstimateFormTextFields/EstimateFromTextFieldsList';

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
    const [fieldValues, setFieldValues] = useState<EstimateFormFields>({});
    const [textInputShapeObjs, setTextInputShapeObjs] = useState<TextInputObj[]>([]);
    const [error, setError] = useState<string | null>(null); // Error state
    const { getAccessToken } = useAuth0User();




    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                if (!templateId) return;
                const token = await getAccessToken();
                if (!token) return;
                const fetchedTemplate = await getTemplate(templateId, token);
                setTemplateData(fetchedTemplate);
                let textInputs: TextInputObj[] = fetchedTemplate.canvasDesign.Shapes.filter(
                    (shape: ShapeObj) => shape.type === "TextInput"
                ) as TextInputObj[];
                setTextInputShapeObjs(textInputs);
                let newFieldValues: EstimateFormFields = {};
                textInputs.forEach((textInput: TextInputObj) => {
                    newFieldValues[textInput.id] = "";
                });
                if (draftId) {
                    await fetchDraft(newFieldValues, token);
                }
                else{
                    setFieldValues(newFieldValues);
                }
                setLoading(false);
            }
            catch (error) {
                setError("Error fetching template");
                console.error("Error fetching template:", error);
                setLoading(false);
            }
        }

        const fetchDraft = async (newFieldValues: EstimateFormFields, token: string) => {
            const fetchedEstimateDraft = await getEstimateDraft(draftId, token);
            setEstimateName(fetchedEstimateDraft.estimateName);
            const draftFieldValues = fetchedEstimateDraft.filledFields; //fieldvalues object saved from the last draft
            //loop through the draft fieldvalues and update the current fieldvalues with the draft fieldvalues
            let missingKeys: string[] = [];
            Object.keys(draftFieldValues).forEach((key) => {
                if (!newFieldValues.hasOwnProperty(key)) {
                    missingKeys.push(key);
                }
                else {
                    newFieldValues[key] = draftFieldValues[key];
                }
            });
            setFieldValues(newFieldValues);
            if (missingKeys.length > 0) {
                alert("There were fields in the draft that are no longer in the template.")
            }
        }

        fetchTemplate();
    }, [draftId, templateId, getAccessToken]);

    if (loading) {
        return (<Loading />)
    }

    if (creating) {
        return (<Creating />)
    }

    if (saving) {
        return (<Saving />)
    }

    if (error) {
        return (<div>{error}</div>)
    }

    if (!templateData) return (<div>Template not found</div>);

    return (
        <>
            <Typography variant="h3" color="primary">
                Create Estimate
            </Typography>
            <div style={{ height: 20 }}></div>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 3 }}>
                    <EstimateName estimateName={estimateName} setEstimateName={setEstimateName} />
                    <div style={{ height: 10 }}></div>
                    <Typography variant="h6" color="gray">
                        Template: {templateData.friendlyName}
                    </Typography>
                    <div style={{ height: 20 }}></div>
                    <EstimateFormTextFieldsList
                        textInputShapeObjs={textInputShapeObjs}
                        fieldValues={fieldValues}
                        setFieldValues={setFieldValues}
                    />
                    <div style={{ display: 'flex' }}>
                        <SubmitButton templateData={templateData} estimateName={estimateName} fieldValues={fieldValues} draftId={draftId} setCreating={setCreating} />
                        <span style={{ width: 20 }}></span>
                        <SaveAsDraftButton templateData={templateData} estimateName={estimateName} fieldValues={fieldValues} draftId={draftId} setSaving={setSaving} />
                    </div>
                </div>
                <div style={{ flex: 1 }}>
                    <PreviewStage canvasDesign={templateData.canvasDesign} />
                </div>
            </div>
        </>
    );
};

export default EstimateForm;
