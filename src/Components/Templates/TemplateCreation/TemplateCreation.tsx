import React, { useState } from "react";
import TemplateName from "../TemplateName/TemplateName";
import NewCanvas from "./NewCanvas/NewCanvas";
import { Box } from "@mui/material";

const TemplateCreation = () => {
    const [friendlyName, setFriendlyName] = useState("New Template");
    return (
        <Box>
            <TemplateName friendlyName={friendlyName} setFriendlyName={setFriendlyName} />
            <Box sx={{ height: '2vh' }} />
            <NewCanvas friendlyName={friendlyName} />
        </Box>
    );
};

export default TemplateCreation;