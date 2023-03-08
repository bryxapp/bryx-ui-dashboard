import { rectangleObj, circleObj, lineObj,textObj } from "./ShapeInterfaces";

export interface TemplateCreationState {
    Rectangles: rectangleObj[];
    Circles: circleObj[];
    Lines: lineObj[];
    TextInputs: textObj[];
};

export interface TemplateData {
    user: string;
    friendlyName: string;
    canvasDesign: TemplateCreationState;
    id: string;
};
