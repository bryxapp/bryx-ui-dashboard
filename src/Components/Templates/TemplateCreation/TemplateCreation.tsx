import React, {useState} from "react";
import TemplateName from "./TemplateName/TemplateName";
import CreationCanvas from "./CreationCanvas/CreationCanvas";

const TemplateCreation = () => {
    const [friendlyName, setFriendlyName] = useState("New Template");
    return (
        <React.Fragment>
            <TemplateName friendlyName = {friendlyName} setFriendlyName={setFriendlyName}/>
            <CreationCanvas friendlyName = {friendlyName}/>
        </React.Fragment>
    );
};

export default TemplateCreation;