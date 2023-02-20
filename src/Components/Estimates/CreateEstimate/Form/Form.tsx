import { useEffect, useState } from 'react';
import { getTemplate } from '../../../../utils/templates-api';
import { useLocation } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Loading from '../../../SharedComponents/Loading/Loading';
import { Button } from '@mui/material';
import FormTextField from './FormTextField/FormTextField';
import { TemplateData } from '../../../../utils/types/TemplateCreationInterfaces';
import { createCanvas } from '../../../../utils/canvas-util';

const Form = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const templateId = params.get('templateId');

    const [loading, setLoading] = useState(true);
    const [templateData, setTemplateData] = useState<TemplateData>();


    const handleSubmit = (canvasDesign: any) => {
        createCanvas(canvasDesign);
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

    if (!templateData) return (<div>Template not found</div>);

    return (
        <>
            <Typography variant="h3" color="primary">
                Create Estimate
            </Typography>
            <div style={{ height: 20 }}></div>
            <Typography variant="h6" color="gray">
                Template: {templateData.friendlyName}
            </Typography>
            {templateData.canvasDesign.TextInputs.map(({ id }: any, index: any) => (
                <FormTextField name={id} index={index} key={"TextInputComponent-" + index} />
            ))}
            <Button variant="contained" onClick={() => handleSubmit(templateData.canvasDesign)}>Submit</Button>
        </>
    );
};

export default Form;
