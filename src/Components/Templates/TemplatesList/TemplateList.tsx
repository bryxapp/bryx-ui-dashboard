import List from '@mui/material/List';
import TemplatesListItem from './TemplatesListItem/TemplatesListItem';
import { SetStateAction, useState } from "react";
import { getTemplates } from '../../../utils/templates-api';



const TemplatesList = () => {

    //get templates from getTemplates function and map them to the list
    const [templates, setTemplates] = useState([]);

    const temp = getTemplates();


    return (
        <List >
            {temp.map((template) => (
                <TemplatesListItem key={template._id} template={template} />
            ))}
        </List>

    );
};

export default TemplatesList;