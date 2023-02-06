import { useState } from "react";
import CanvasToolbar from "../../Canvas/CanvasToolbar/CanvasToolbar";
import CanvasStage from "../../Canvas/CanvasStage/CanvasStage";
import { TemplateCreationState } from "../../../../Interfaces/TemplateCreationInterfaces";


const NewCanvas = ({ friendlyName }: any) => {

    const [canvasDesign, setCanvasDesign] = useState<TemplateCreationState>({
        Rectangles: [],
        TextInputs: [],
    });

    return (
        <div>
            <CanvasToolbar canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} friendlyName={friendlyName} />
            <div style={{ padding: '1vh' }} />
            <CanvasStage canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
        </div>
    );
};

export default NewCanvas;