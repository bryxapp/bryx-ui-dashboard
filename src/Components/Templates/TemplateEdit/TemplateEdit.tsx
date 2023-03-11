import React, { useState } from "react";
import TemplateName from "../TemplateName/TemplateName";
import EditCanvas from "./EditCanvas/EditCanvas";
import { Box } from "@mui/material";

const TemplateEdit = () => {
    const [friendlyName, setFriendlyName] = useState("New Template");
    return (
        <Box>
            <TemplateName friendlyName={friendlyName} setFriendlyName={setFriendlyName} />
            <Box sx={{ height: '2vh' }} />
            <EditCanvas friendlyName={friendlyName} setFriendlyName={setFriendlyName} />
        </Box>
    );
};

export default TemplateEdit;