import List from '@mui/material/List';
import TemplatesListItem from './TemplatesListItem/TemplatesListItem';
import { getTemplates } from '../../../utils/templates-api';



const TemplatesList = () => {
    const templates = getTemplates();

    return (
        <List >
            {templates.map((template) => (
                <TemplatesListItem key={template._id} template={template} />
            ))}
        </List>

    );
};

export default TemplatesList;