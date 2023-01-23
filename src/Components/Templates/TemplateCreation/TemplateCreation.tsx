import { Typography } from "@mui/material";
import React from "react";
import CreationCanvas from "./CreationCanvas/CreationCanvas";

const TemplateCreation = () => {
    return (
        <React.Fragment>
            <Typography variant="h3" color="dark">
                Create New Template
            </Typography>
            <CreationCanvas />
        </React.Fragment>
    );
};

export default TemplateCreation;