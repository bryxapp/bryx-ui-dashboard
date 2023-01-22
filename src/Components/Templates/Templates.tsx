import { Button, Typography } from "@mui/material";
import React from "react";
import TemplatesList from "./TemplatesList/TemplateList";

const Templates = () => {
    return (
        <React.Fragment>
            <Typography variant="h3" color="dark">
                Templates
            </Typography>
            <br />
            <Button variant="contained" color="primary" size="large" sx={{ borderRadius: 2 }} href="/create-template">
                + New Template
            </Button>
            {/*//List of templates */}
            <TemplatesList />
        </React.Fragment>
    );
};

export default Templates;