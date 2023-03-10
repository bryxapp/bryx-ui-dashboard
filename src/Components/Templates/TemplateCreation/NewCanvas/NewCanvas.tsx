import { useState } from "react";
import CanvasToolbar from "../../Canvas/CanvasToolbar/CanvasToolbar";
import CanvasStage from "../../Canvas/CanvasStage/CanvasStage";
import { TemplateCreationState } from "../../../../utils/types/TemplateCreationInterfaces";
import { createTemplate } from "../../../../utils/templates-api";
import { useAuth0 } from "@auth0/auth0-react";


const NewCanvas = ({ friendlyName }: any) => {

    const { user } = useAuth0();
    const userName = user?.email ? user.email : "";

    const [canvasDesign, setCanvasDesign] = useState<TemplateCreationState>({
        Rectangles: [],
        Circles: [],
        Lines: [],
        TextInputs: [],
    });
    
    const createTemplateOnSave = () => {
        //create new template
        return createTemplate(canvasDesign, friendlyName,userName);
    }

    return (
        <div>
            <CanvasToolbar canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} friendlyName={friendlyName} postTemplate={createTemplateOnSave} />
            <div style={{ padding: '1vh' }} />
            <CanvasStage canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
        </div>
    );
};

export default NewCanvas;