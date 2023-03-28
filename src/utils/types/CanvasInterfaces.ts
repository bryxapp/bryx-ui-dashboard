export interface CanvasDesignData {
    Shapes: ShapeObj[];
    selectedId: string | null;
}

export interface ShapeObj {
    id: string;
    type: ShapeType;
    x: number;
    y: number;
    rotation: number;
    isDragging: boolean;
}

export interface RectangleObj extends ShapeObj {
    width: number;
    height: number;
    fill: string;
    type: 'Rectangle';
}

export interface EllipseObj extends ShapeObj {
    radiusX: number;
    radiusY: number;
    fill: string;
    type: 'Ellipse';
}

export interface LineObj extends ShapeObj {
    points: number[];
    stroke: string;
    strokeWidth: number;
    type: 'Line';
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
    type: 'TextInput';
}

export interface TextFieldObj extends ShapeObj, TextObj {
    value: string;
    type: 'TextField';
}

export interface ImageObj extends ShapeObj {
    src: string;
    width: number;
    height: number;
    type: 'Image';
}

export interface ToolBarProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

export type ShapeType = 'Rectangle' | 'Ellipse' | 'Line' | 'TextInput' | 'TextField' | 'Image';  