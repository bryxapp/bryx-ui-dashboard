import React, { useState } from "react";
import TemplateName from "../TemplateName/TemplateName";
import EditCanvas from "./EditCanvas/EditCanvas";

const TemplateEdit = () => {
    const [friendlyName, setFriendlyName] = useState("New Template");
    return (
        <React.Fragment>
            <TemplateName friendlyName={friendlyName} setFriendlyName={setFriendlyName} />
            <div style={{ padding: '.5vh' }} />
            <EditCanvas friendlyName={friendlyName} setFriendlyName={setFriendlyName}/>
        </React.Fragment>
    );
};

export default TemplateEdit;