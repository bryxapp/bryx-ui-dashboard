import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

import { createEstimate } from '../../../../utils/api/estimates-api';
import { getEstimateDraft, createEstimateDraft, updateEstimateDraft, deleteEstimateDraft } from '../../../../utils/api/estimate-drafts-api';
import { getTemplate } from '../../../../utils/api/templates-api';

import { ShapeObj, TextInputObj } from '../../../../utils/types/CanvasInterfaces';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { EstimateFormFields } from '../../../../utils/types/EstimateInterfaces';

import Creating from '../../../SharedComponents/Creating/Creating';
import EstimateFormTextField from './EstimateFormTextField/EstimateFormTextField';
import EstimateName from './EstimateName/EstimateName';
import Loading from '../../../SharedComponents/Loading/Loading';
import PreviewStage from './TemplatePreview/TemplatePreview';
import Saving from '../../../SharedComponents/Saving/Saving';
import { useAccessToken } from '../../../../utils/customHooks/useAccessToken';

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
    const { getAccessToken } = useAccessToken();

    useEffect(() => {
        if (!templateId) return;
        getAccessToken().then((token) => {
            if (!token) return;
            getTemplate(templateId, token)
                .then((res) => {
                    setTemplateData(res.data);
                    let textInputs: TextInputObj[] = res.data.canvasDesign.Shapes.filter(
                        (shape: ShapeObj) => shape.type === "TextInput"
                    ) as TextInputObj[];
                    setTextInputShapeObjs(textInputs);
                    let newFieldValues: EstimateFormFields = {};
                    textInputs.forEach((textInput: TextInputObj) => {
                        newFieldValues[textInput.id] = "";
                    });
                    if (draftId) {
                        getEstimateDraft(draftId, token)
                            .then((res) => {
                                setEstimateName(res.data.estimateName);
                                const draftFieldValues = res.data.filledFields; //fieldvalues object saved from the last draft
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
                            });
                    }

                    setFieldValues(newFieldValues);
                    setLoading(false);
                });
        });

    }, [draftId, templateId, getAccessToken]);



    const handleSubmit = async () => {
        setCreating(true);
        try {
            if (!templateData) return;
            getAccessToken().then(async (token) => {
                if (!token) return;
                const res = await createEstimate(templateData.canvasDesign, templateData.id, estimateName, fieldValues, token);
                if (draftId) deleteEstimateDraft(draftId, token); //delete the draft if it exists

                // Wait for 2 seconds before navigating to the estimate page
                await new Promise((resolve) => setTimeout(resolve, 2000));

                window.location.href = "/view-estimate?estimateId=" + res.data.id;
            });

        } catch (error) {
            console.error("Error creating estimate:", error);
        } finally {
            setCreating(false);
        }
    };

    const handleSaveAsDraft = async () => {
        setSaving(true);
        try {
            if (!templateData) {
                return;
            }
            getAccessToken().then(async (token) => {
                if (!token) return;
                if (!draftId) {
                    await createEstimateDraft(templateData.id, estimateName, fieldValues, token);
                }
                else {
                    await updateEstimateDraft(templateData.id, estimateName, fieldValues, draftId, token);
                }
            });

            window.location.href = "/?tab=1";
        } catch (error) {
            console.error("Error Saving Estimate Draft:", error);
        } finally {
            setSaving(false);
        }
    };






    if (loading) {
        return (<Loading />)
    }

    if (creating) {
        return (<Creating />)
    }

    if (saving) {
        return (<Saving />)
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
                    {textInputShapeObjs.map((inputObj: TextInputObj) => (
                        <span key={inputObj.id}>
                            <EstimateFormTextField textInputObj={inputObj} fieldValues={fieldValues} setFieldValues={setFieldValues} />
                            <div style={{ height: 20 }}></div>
                        </span>
                    ))}
                    <div style={{ display: 'flex' }}>
                        <Button variant="contained" size="large" onClick={() => handleSubmit()}>Submit</Button>
                        <span style={{ width: 20 }}></span>
                        {!draftId && <Button variant="contained" size="large" onClick={() => handleSaveAsDraft()}>Save As Draft</Button>}
                        {draftId && <Button variant="contained" size="large" onClick={() => handleSaveAsDraft()}>Update Draft</Button>}
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
