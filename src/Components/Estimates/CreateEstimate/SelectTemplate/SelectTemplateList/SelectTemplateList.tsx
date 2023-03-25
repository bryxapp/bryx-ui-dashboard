import React, { useEffect, useState } from "react";
import { getTemplates } from "../../../../../utils/templates-api";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SelectTemplateListItem from "./SelectTemplateListItem/SelectTemplateListItem";
import NoneFound from "../../../../SharedComponents/NoneFound/NoneFound";
import { useAuth0 } from '@auth0/auth0-react';
import { TemplateData } from "../../../../../utils/types/TemplateCreationInterfaces";

const SelectTemplateList = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth0();
    const userId = user?.email ? user.email : "";

    useEffect(() => {
        if (!userId) return;
        getTemplates(userId).then((response) => {
            setTemplates(response.data);
            setLoading(false);
        });
    }, [userId]);

    if (loading) return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Loading...
        </Typography>
    );
    if (templates.length === 0) return (
        <React.Fragment>
            <NoneFound item="templates" />
            <br />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Please create a template to continue
            </Typography>
            <br />
            <div style={{ textAlign: 'center' }}>
                <Button variant="contained" color="primary" href="/create-template">
                    Create Template
                </Button>
            </div>

        </React.Fragment>

    );
    return (
        <Grid container spacing={3}>
            {templates.map((template:TemplateData) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <SelectTemplateListItem template={template} />
                </Grid>
            ))}
        </Grid>
    );
}

export default SelectTemplateList;