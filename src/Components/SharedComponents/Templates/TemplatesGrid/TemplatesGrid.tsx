import React, { useEffect, useState, } from 'react';
import Grid from '@mui/material/Grid';
import TemplatesListItem from './TemplateItem/TemplateItem';
import { getTemplates, deleteTemplate } from '../../../../utils/api/templates-api';
import { Typography } from '@mui/material';
import NoneFound from '../../../SharedComponents/NoneFound/NoneFound';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import logger from '../../../../logging/logger';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import ErrorModal from '../../ErrorModal/ErrorModal';

interface TemplatesGridProps {
    setMaxTemplatesReached: ((value: boolean) => void) | null;
    baseUrl: string;
    showActions?: boolean;
}

const TemplatesGrid: React.FC<TemplatesGridProps> = ({ setMaxTemplatesReached, baseUrl, showActions = false }) => {
    const [templates, setTemplates] = useState<TemplateData[]>([]);
    const { auth0User, getAccessToken } = useAuth0User();
    const [error, setError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [templateRequestCompleted, setTemplateRequestCompleted] = useState(false);

    useEffect(() => {
        const fetchTemplates = async () => {
            setTemplateRequestCompleted(false);
            try {
                setError(false);
                if (!auth0User) return;
                const token = await getAccessToken();
                if (!token) return;
                const templateData = await getTemplates(token);
                setTemplates(templateData.templates);
                if (setMaxTemplatesReached) {
                    setMaxTemplatesReached(templateData.maxTemplatesReached);
                }
            } catch (error) {
                logger.trackException({
                    properties: {
                        name: "Templates Fetch Error",
                        page: "Templates",
                        description: "Error fetching templates",
                        error: error,
                    },
                });
                setError(true);
                console.error('Error retrieving estimates:', error);
            } finally {
                setTemplateRequestCompleted(true);
            }
        };
        fetchTemplates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth0User?.sub]);

    const handleTemplateDelete = async (templateId: string) => {
        try {
            setDeleteError(false);
            const token = await getAccessToken();
            if (!token) return;

            await deleteTemplate(templateId, token);
            setTemplates(prevTemplates => prevTemplates.filter(template => template.id !== templateId));
        } catch (error) {
            logger.trackException({
                properties: {
                    name: "Template Delete Error",
                    page: "Templates",
                    description: "Error deleting template",
                    error: error,
                },
            });
            setDeleteError(true);
            console.error('Error deleting template:', error);
        }
    };

    if (!templateRequestCompleted)
        return <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center', my: 2 }}>Loading...</Typography>;

    if (error) return <ErrorMessage dataName='templates' />;

    if (templates.length === 0) return <NoneFound item='templates' />;

    return (
        <>
            <ErrorModal error={deleteError} setError={setDeleteError} />
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
        </>
    );
};

export default TemplatesGrid;
