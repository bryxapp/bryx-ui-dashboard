export interface shapeObj {
    id: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    text?: string;
    isDragging: boolean;
}

export interface TemplateCreationState {
    Rectangles: shapeObj[];
    TextInputs: shapeObj[];
};

export interface TemplateData {
    user: string;
    friendlyName: string;
    canvasDesign: TemplateCreationState;
    id: string;
};
