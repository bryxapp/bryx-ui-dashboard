import { rectangleObj, textObj } from "./ShapeInterfaces";

export interface TemplateCreationState {
    Rectangles: rectangleObj[];
    TextInputs: textObj[];
};

export interface TemplateData {
    user: string;
    friendlyName: string;
    canvasDesign: TemplateCreationState;
    id: string;
};
