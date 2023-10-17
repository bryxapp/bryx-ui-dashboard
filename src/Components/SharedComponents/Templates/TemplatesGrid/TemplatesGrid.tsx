import React, { useEffect, useState, } from 'react';
import Grid from '@mui/material/Grid';
import TemplatesListItem from './TemplateItem/TemplateItem';
import { getTemplates, deleteTemplate } from '../../../../utils/api/templates-api';
import { Typography, Alert } from '@mui/material';
import NoneFound from '../../../SharedComponents/NoneFound/NoneFound';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { useAccessToken } from '../../../../utils/customHooks/useAccessToken';

interface TemplatesGridProps {
    setMaxTemplatesReached: ((value: boolean) => void) | null;
    baseUrl: string;
    showActions?: boolean;
}

const TemplatesGrid: React.FC<TemplatesGridProps> = ({ setMaxTemplatesReached, baseUrl, showActions = false }) => {
    const [templates, setTemplates] = useState<TemplateData[]>([]);
    const { auth0User, getAccessToken } = useAccessToken();
    const [errorRetrievingTemplates, setErrorRetrievingTemplates] = useState(false);
    const [templateRequestCompleted, setTemplateRequestCompleted] = useState(false);

    useEffect(() => {
        const fetchTemplates = async () => {
            setTemplateRequestCompleted(false);
            try {
                if (!auth0User) return;
                const token = await getAccessToken();
                if (!token) return;
                const response = await getTemplates(token);
                setTemplates(response.data.templates);
                if (setMaxTemplatesReached) {
                    setMaxTemplatesReached(response.data.maxTemplatesReached);
                }
            } catch (error) {
                console.error('Error retrieving estimates:', error);
                setErrorRetrievingTemplates(true);
            } finally {
                setTemplateRequestCompleted(true);
            }
        };
        fetchTemplates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth0User?.sub]);

    const handleTemplateDelete = async (templateId: string) => {
        const token = await getAccessToken();
        if (!token) return;

        await deleteTemplate(templateId, token);
        setTemplates(prevTemplates => prevTemplates.filter(template => template.id !== templateId));
    };

    if (!templateRequestCompleted)
        return <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center', my: 2 }}>Loading...</Typography>;

    if (errorRetrievingTemplates)
        return <Alert severity="error">There was an error retrieving your templates. Please try again.</Alert>

    if (templates.length === 0) return <NoneFound item='templates' />;

    return (
        <Grid container spacing={2}>
            {templates.map(template => (
                <Grid item xs={12} sm={6} md={4} key={template.id}>
                    <TemplatesListItem
                        template={template}
                        handleTemplateDelete={handleTemplateDelete}
                        baseUrl={baseUrl}
                        showActions={showActions}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default TemplatesGrid;
