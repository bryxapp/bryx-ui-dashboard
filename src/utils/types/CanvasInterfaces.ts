export interface CanvasDesignData {
    Rectangles: RectangleObj[];
    Circles: CircleObj[];
    Lines: LineObj[];
    TextInputs: TextInputObj[];
    TextFields: TextFieldObj[];
    selectedId: string | null;
};

export interface ShapeObj {
    id: string;
    x: number;
    y: number;
    rotation: number;
    isDragging: boolean;
}


export interface RectangleObj extends ShapeObj {
    width: number;
    height: number;
    fill: string;
}

export interface CircleObj extends ShapeObj {
    radius: number;
    fill: string;
}

export interface LineObj extends ShapeObj {
    points: number[];
    stroke: string;
    strokeWidth: number;
}

export interface TextObj {
    fontSize: number;
    fill: string;
    fontFamily: string;
    fontStyle: string;
    textDecoration: string;
}

export interface TextInputObj extends ShapeObj, TextObj {
    displayName: string;
}

export interface TextFieldObj extends ShapeObj, TextObj {
    value: string;
}

export interface ToolBarProps {
    canvasDesign: any;
    setCanvasDesign: React.Dispatch<React.SetStateAction<any>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}