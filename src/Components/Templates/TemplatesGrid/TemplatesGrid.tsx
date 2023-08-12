import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import TemplatesListItem from './TemplateItem/TemplateItem';
import { getTemplates, deleteTemplate } from '../../../utils/templates-api';
import { Typography } from '@mui/material';
import NoneFound from '../../SharedComponents/NoneFound/NoneFound';
import { TemplateData } from '../../../utils/types/TemplateInterfaces';
import { useAccessToken } from '../../../utils/customHooks/useAccessToken';

const MAX_TEMPLATES = 6;

interface TemplatesGridProps {
    setMaxReached: any;
}

const TemplatesGrid = ({ setMaxReached }: TemplatesGridProps) => {
    const [templates, setTemplates] = useState<TemplateData[]>([]);
    const [loading, setLoading] = useState(true);
    const { userId, getAccessToken } = useAccessToken();

    useEffect(() => {
        if (!userId) return;
        getAccessToken().then((token) => {
            if (!token) return;
            getTemplates(userId, token).then((response) => {
                setTemplates(response.data);
                if (response.data.length >= MAX_TEMPLATES) {
                    setMaxReached(true);
                }
                setLoading(false);
            });
        });
    }, [getAccessToken, setMaxReached, userId]);

    const handleTemplateDelete = (templateId: string) => {
        getAccessToken().then((token) => {
            if (!token) return;
            deleteTemplate(templateId, token).then(() => {
                setTemplates(templates.filter((template: TemplateData) => template.id !== templateId));
            });
        }
        );
    };

    if (loading)
        return (
            <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center', my: 2 }}>
                Loading...
            </Typography>
        );
    if (templates.length === 0) return <NoneFound item='templates' />;

    return (
        <Grid container spacing={2}>
            {templates.map((template) => (
                <Grid item xs={12} sm={6} md={4} key={template.id}>
                    <TemplatesListItem template={template} handleTemplateDelete={handleTemplateDelete} />
                </Grid>
            ))}
        </Grid>
    );
};

export default TemplatesGrid;
