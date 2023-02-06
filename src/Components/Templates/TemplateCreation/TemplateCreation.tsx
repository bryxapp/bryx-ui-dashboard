import React, {useState} from "react";
import TemplateName from "../TemplateName/TemplateName";
import NewCanvas from "./NewCanvas/NewCanvas";

const TemplateCreation = () => {
    const [friendlyName, setFriendlyName] = useState("New Template");
    return (
        <React.Fragment>
            <TemplateName friendlyName = {friendlyName} setFriendlyName={setFriendlyName}/>
            <NewCanvas friendlyName = {friendlyName}/>
        </React.Fragment>
    );
};

export default TemplateCreation;