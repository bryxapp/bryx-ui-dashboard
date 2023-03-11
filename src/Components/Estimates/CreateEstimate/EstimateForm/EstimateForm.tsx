import { useEffect, useState } from 'react';
import { getTemplate } from '../../../../utils/templates-api';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Loading from '../../../SharedComponents/Loading/Loading';
import { Button } from '@mui/material';
import EstimateFormTextField from './EstimateFormTextField/EstimateFormTextField';
import { TemplateData } from '../../../../utils/types/TemplateCreationInterfaces';
import { createEstimate } from '../../../../utils/estimates-api';
import EstimateName from './EstimateName/EstimateName';
import Creating from '../../../SharedComponents/Creating/Creating';
import { useAuth0 } from '@auth0/auth0-react';

const EstimateForm = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const templateId = params.get('templateId');

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [templateData, setTemplateData] = useState<TemplateData>();
    const [estimateName, setEstimateName] = useState("New Estimate");
    const [fieldValues, setFieldValues] = useState<string[]>([]);
    const { user } = useAuth0();
    const userName = user?.email ? user.email : "";


    const handleSubmit = () => {
        setCreating(true);
        if (!templateData) return;
        createEstimate(templateData.canvasDesign, templateData.id, estimateName, fieldValues, userName)
            .then((res) => {
                //Wait for 2 seconds before navigating to the estimate page
                setTimeout(() => {
                    setCreating(false);
                    window.location.href = "/view-estimate?estimateId=" + res.data.id;
                }, 2000);
            });
    }

    useEffect(() => {
        if (templateId) {
            getTemplate(templateId)
                .then((res) => {
                    setTemplateData(res.data);
                    setFieldValues(new Array(res.data.canvasDesign.TextInputs.length).fill(''));
                    setLoading(false);
                });
        }
    }, [templateId]);

    const handleFieldValueChange = (index: number, value: string) => {
        const newFieldValues = [...fieldValues];
        newFieldValues[index] = value;
        setFieldValues(newFieldValues);
        console.log(newFieldValues)
    };


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
            {templateData.canvasDesign.TextInputs.map((inputObj: any, index: any) => (
                <>
                    <EstimateFormTextField name={inputObj.displayName} index={index} key={inputObj.id} value={fieldValues[index]} onValueChange={handleFieldValueChange} />
                    <div style={{ height: 15 }}></div>
                </>
            ))}
            <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
        </>
    );
};

export default EstimateForm;
