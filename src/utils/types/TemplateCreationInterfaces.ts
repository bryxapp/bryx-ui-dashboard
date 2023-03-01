import { rectangleObj, circleObj, textObj } from "./ShapeInterfaces";

export interface TemplateCreationState {
    Rectangles: rectangleObj[];
    Circles: circleObj[];
    TextInputs: textObj[];
};

export interface TemplateData {
    user: string;
    friendlyName: string;
    canvasDesign: TemplateCreationState;
    id: string;
};
