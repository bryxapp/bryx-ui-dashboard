import { rectangleObj, circleObj, lineObj,textObj } from "./ShapeInterfaces";

export interface TemplateCreationState {
    Rectangles: rectangleObj[];
    Circles: circleObj[];
    Lines: lineObj[];
    TextInputs: textObj[];
    selectedId: string|null;
};

export interface TemplateData {
    user: string;
    friendlyName: string;
    canvasDesign: TemplateCreationState;
    id: string;
};
