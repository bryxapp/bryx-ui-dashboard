import React, { useEffect, useState } from "react";
import { getTemplates } from "../../../../../utils/templates-api";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SelectTemplateListItem from "./SelectTemplateListItem/SelectTemplateListItem";

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
        <Grid container spacing={3}>
            {templates.map((template) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SelectTemplateListItem template={template} />
                </Grid>
            ))}
        </Grid>
    );
}

export default SelectTemplateList;