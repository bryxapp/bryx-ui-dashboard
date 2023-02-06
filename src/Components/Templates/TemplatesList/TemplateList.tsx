import { useEffect, useState } from 'react';
import List from '@mui/material/List';
import TemplatesListItem from './TemplatesListItem/TemplatesListItem';
import { getTemplates } from '../../../utils/templates-api';
import { Typography } from '@mui/material';
import { deleteTemplate } from '../../../utils/templates-api';

const TemplatesList = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTemplates().then((response) => {
            console.log(response.data);
            setTemplates(response.data);
            setLoading(false);
        });
    }, []);

    const handleTemplateDelete = (templateId: string) => {
        deleteTemplate(templateId).then((response) => {
            console.log(response);
            setTemplates(templates.filter((template: any) => template.id !== templateId));
        });
    };

    if (loading) return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Loading...
        </Typography>
    );
    if (templates.length === 0) return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            No templates found
        </Typography>
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