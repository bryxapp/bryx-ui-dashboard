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

const EstimateForm = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const templateId = params.get('templateId');

    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [templateData, setTemplateData] = useState<TemplateData>();
    const [estimateName, setEstimateName] = useState("New Estimate");

    const handleSubmit = () => {
        setCreating(true);
        if (!templateData) return;
        createEstimate(templateData.canvasDesign, templateData.id, estimateName)
            .then((res) => {
                console.log(res)
                setCreating(false);
                //Navigate users to the estimate page
                window.location.href = "/past-estimates";
            });
    }

    useEffect(() => {
        if (templateId) {
            getTemplate(templateId)
                .then((res) => {
                    setTemplateData(res.data);
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
            {templateData.canvasDesign.TextInputs.map(({ id }: any, index: any) => (
                <EstimateFormTextField name={id} index={index} key={"TextInputComponent-" + index} />
            ))}
            <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
        </>
    );
};

export default EstimateForm;
