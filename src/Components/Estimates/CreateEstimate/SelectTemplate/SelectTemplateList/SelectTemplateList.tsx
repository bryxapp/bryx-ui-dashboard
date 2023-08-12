import React, { useEffect, useState } from "react";
import { getTemplates } from "../../../../../utils/api/templates-api";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SelectTemplateListItem from "./SelectTemplateListItem/SelectTemplateListItem";
import NoneFound from "../../../../SharedComponents/NoneFound/NoneFound";
import { TemplateData } from "../../../../../utils/types/TemplateInterfaces";
import { useAccessToken } from "../../../../../utils/customHooks/useAccessToken";

const SelectTemplateList = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getAccessToken } = useAccessToken();
    useEffect(() => {
        getAccessToken().then((token) => {
            if (!token) return;
            getTemplates(token).then((response) => {
                setTemplates(response.data);
                setLoading(false);
            });
        });
    }, [getAccessToken]);

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
        <Grid container spacing={6}>
            {templates.map((template: TemplateData) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
                    <SelectTemplateListItem template={template} />
                </Grid>
            ))}
        </Grid>
    );
}

export default SelectTemplateList;