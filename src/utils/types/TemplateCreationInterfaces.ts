import { rectangleObj, circleObj, lineObj, textInputObj, textFieldObj } from "./ShapeInterfaces";

export interface TemplateCreationState {
    Rectangles: rectangleObj[];
    Circles: circleObj[];
    Lines: lineObj[];
    TextInputs: textInputObj[];
    TextFields: textFieldObj[];
    selectedId: string | null;
};

export interface TemplateData {
    user: string;
    friendlyName: string;
    canvasDesign: TemplateCreationState;
    id: string;
};
