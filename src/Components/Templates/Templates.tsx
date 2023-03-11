import { Button, Typography } from "@mui/material";
import React from "react";
import TemplatesList from "./TemplatesList/TemplateList";
import logger from "../../logging/logger";
import { useAuth0 } from "@auth0/auth0-react";

const Templates = () => {
    const { user } = useAuth0();

    const handleNewTemplateClick = () => {
        logger.trackEvent({ name: 'New Template Click', properties: { menu: 'New Template', user: user?.name } });
    }

    return (
        <React.Fragment>
            <Typography variant="h3" color="dark">
                Templates
            </Typography>
            <br />
            <Button href="/create-template" onClick={handleNewTemplateClick} variant="contained" color="primary" size="large" sx={{ borderRadius: 2 }}>
                + New Template
            </Button>
            {/*//List of templates */}
            <TemplatesList />
        </React.Fragment>
    );
};

export default Templates;