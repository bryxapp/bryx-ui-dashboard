import { useState } from "react";
import CanvasToolbar from "./CanvasToolbar/CanvasToolbar";
import CanvasStage from "./CanvasStage/CanvasStage";
import { TemplateCreationState } from "../../../../Interfaces/TemplateCreationInterfaces";
import { styled } from "@mui/material/styles";
import { padding } from "@mui/system";


const CreationCanvas = () => {

    const [shapes, setShapes] = useState<TemplateCreationState>({
        Rectangles: [],
        TextInputs: [],
    });

    return (
        <div>
            <CanvasToolbar shapes={shapes} setShapes={setShapes} />
            <div style={{ padding: '1vh' }} />
            <CanvasStage shapes={shapes} setShapes={setShapes} />
        </div>
    );
};

export default CreationCanvas;