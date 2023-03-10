import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import TemplatesListItem from './TemplatesListItem/TemplatesListItem';
import { getTemplates } from '../../../utils/templates-api';
import { Typography } from '@mui/material';
import { deleteTemplate } from '../../../utils/templates-api';
import NoneFound from '../../SharedComponents/NoneFound/NoneFound';
import { useAuth0 } from '@auth0/auth0-react';


const TemplatesList = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth0();
    const userId = user?.email ? user.email : "";

    useEffect(() => {
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

    if (loading) return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Loading...
        </Typography>
    );
    if (templates.length === 0) return (
        <NoneFound item="templates" />
    );
    return (
        <List>
            {templates.map((template) => (
                <TemplatesListItem template={template} handleTemplateDelete={handleTemplateDelete} />
            ))}
        </List>
    );

};

export default TemplatesList;