import { useState } from "react";
import CanvasToolbar from "./CanvasToolbar/CanvasToolbar";
import CanvasStage from "./CanvasStage/CanvasStage";
import { TemplateCreationState } from "../../../../Interfaces/TemplateCreationInterfaces";


const CreationCanvas = () => {

    const [shapes, setShapes] = useState<TemplateCreationState>({
        Rectangles: [],
        TextInputs: [],
    });


    return (
        <div>
            <CanvasToolbar shapes={shapes} setShapes={setShapes} />
            <CanvasStage shapes={shapes} setShapes={setShapes} />
        </div>
    );
};

export default CreationCanvas;