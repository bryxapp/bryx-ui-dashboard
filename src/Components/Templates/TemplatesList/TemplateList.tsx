import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import TemplatesListItem from './TemplatesListItem/TemplatesListItem';
import { getTemplates } from '../../../Utils/templates-api';
import { Typography } from '@mui/material';
import { deleteTemplate } from '../../../Utils/templates-api';
import NoneFound from '../../SharedComponents/NoneFound/NoneFound';
import { useAuth0 } from '@auth0/auth0-react';
import { TemplateData } from '../../../Utils/types/TemplateCreationInterfaces';

const TemplatesList = () => {
    const [templates, setTemplates] = useState<TemplateData[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth0();
    const userId = user?.email ? user.email : '';

    useEffect(() => {
        if (!userId) return;
        getTemplates(userId).then((response) => {
            setTemplates(response.data);
            setLoading(false);
        });
    }, [userId]);

    const handleTemplateDelete = (templateId: string) => {
        deleteTemplate(templateId).then((response) => {
            setTemplates(templates.filter((template: any) => template.id !== templateId));
        });
    };

    if (loading)
        return (
            <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center', my: 2 }}>
                Loading...
            </Typography>
        );
    if (templates.length === 0) return <NoneFound item='templates' />;
    return (
        <List sx={{ width: '100%' }}>
            {templates.map((template) => (
                <TemplatesListItem key={template.id} template={template} handleTemplateDelete={handleTemplateDelete} />
            ))}
        </List>
    );
};

export default TemplatesList;
