import { useEffect, useState } from 'react';
import { getTemplate } from '../../../../utils/templates-api';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Loading from '../../../SharedComponents/Loading/Loading';
import { Button } from '@mui/material';
import EstimateFormTextField from './EstimateFormTextField/EstimateFormTextField';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { createEstimate } from '../../../../utils/estimates-api';
import EstimateName from './EstimateName/EstimateName';
import Creating from '../../../SharedComponents/Creating/Creating';
import { useAuth0 } from '@auth0/auth0-react';
import { ShapeObj, TextInputObj } from '../../../../utils/types/CanvasInterfaces';

const EstimateForm = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const templateId = params.get('templateId');

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [templateData, setTemplateData] = useState<TemplateData>();
    const [estimateName, setEstimateName] = useState("New Estimate");
    const [fieldValues, setFieldValues] = useState<string[]>([]);
    const [textInputs, setTextInputs] = useState<TextInputObj[]>([]);
    const { user } = useAuth0();
    const userName = user?.email || "";

    const handleSubmit = async () => {
        setCreating(true);

        try {
            if (!templateData) {
                return;
            }

            const res = await createEstimate(templateData.canvasDesign, templateData.id, estimateName, fieldValues, userName);

            // Wait for 2 seconds before navigating to the estimate page
            await new Promise((resolve) => setTimeout(resolve, 2000));

            window.location.href = "/view-estimate?estimateId=" + res.data.id;
        } catch (error) {
            console.error("Error creating estimate:", error);
        } finally {
            setCreating(false);
        }
    };


    useEffect(() => {
        if (templateId) {
            getTemplate(templateId)
                .then((res) => {
                    setTemplateData(res.data);
                    let textInputs: TextInputObj[] = res.data.canvasDesign.Shapes.filter(
                        (shape: ShapeObj) => shape.type === "TextInput"
                    ) as TextInputObj[];
                    setTextInputs(textInputs);
                    setFieldValues(new Array(textInputs.length).fill(""));
                    setLoading(false);
                });
        }
    }, [templateId]);


    if (loading) {
        return (<Loading />)
    }

    if (creating) {
        return (<Creating />)
    }

    if (!templateData) return (<div>Template not found</div>);

    return (
        <>
            <Typography variant="h3" color="primary">
                Create Estimate
            </Typography>
            <div style={{ height: 20 }}></div>
            <EstimateName estimateName={estimateName} setEstimateName={setEstimateName} />
            <div style={{ height: 20 }}></div>
            <Typography variant="h6" color="gray">
                Template: {templateData.friendlyName}
            </Typography>
            {textInputs.map((inputObj: TextInputObj, index: number) => (
                <span key={inputObj.id}>
                    <EstimateFormTextField textInputObj={inputObj} index={index} fieldValues={fieldValues} setFieldValues={setFieldValues} />
                    <div style={{ height: 15 }}></div>
                </span>
            ))}
            <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
        </>
    );
};

export default EstimateForm;
