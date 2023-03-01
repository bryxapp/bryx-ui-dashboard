import { useState } from "react";
import CanvasToolbar from "../../Canvas/CanvasToolbar/CanvasToolbar";
import CanvasStage from "../../Canvas/CanvasStage/CanvasStage";
import { TemplateCreationState } from "../../../../utils/types/TemplateCreationInterfaces";
import { createTemplate } from "../../../../utils/templates-api";


const NewCanvas = ({ friendlyName }: any) => {

    const [canvasDesign, setCanvasDesign] = useState<TemplateCreationState>({
        Rectangles : [],
        Circles: [],
        TextInputs: [],
    });

    const createTemplateOnSave = () => {
        //create new template
        return createTemplate(canvasDesign, friendlyName);
    }

    return (
        <div>
            <CanvasToolbar canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} friendlyName={friendlyName} postTemplate = {createTemplateOnSave}/>
            <div style={{ padding: '1vh' }} />
            <CanvasStage canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
        </div>
    );
};

export default NewCanvas;