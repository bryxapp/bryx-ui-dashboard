import React, { useEffect, useState } from "react";
import { getTemplates } from "../../../../../utils/templates-api";
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SelectTemplateListItem from "./SelectTemplateListItem/SelectTemplateListItem";
import { Box } from "@mui/system";

const SelectTemplateList = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTemplates().then((response) => {
            setTemplates(response.data);
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Loading...
        </Typography>
    );
    if (templates.length === 0) return (
        <React.Fragment>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                No templates found. Please create a template.
            </Typography>
            <Button variant="contained" color="primary" href="/templates">
                Create Template
            </Button>
        </React.Fragment>

    );
    return (
        <List>
            {templates.map((template) => (
                <SelectTemplateListItem template={template} />
            ))}
        </List>
    );
}

export default SelectTemplateList;