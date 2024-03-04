export interface CanvasDesignData {
    Shapes: (ShapeObj | RectangleObj | EllipseObj | LineObj | TextInputObj | TextFieldObj | ImageObj)[];
    selectedId: string | null;
    pageHeight: number;
    pageWidth: number;
}

export interface ShapeObj {
    id: string;
    type: ShapeType;
    x: number;
    y: number;
    rotation: number;
    isDragging: boolean;
}

export interface RectangleObj extends ShapeObj, SolidShapeObj {
    width: number;
    height: number;
    cornerRadius?: number;
    type: 'Rectangle' | 'RoundedRectangle';
}

export interface EllipseObj extends ShapeObj, SolidShapeObj {
    radiusX: number;
    radiusY: number;
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
    align: string;
}

export interface TextInputObj extends ShapeObj, TextObj {
    displayName: string;
    type: 'TextInput';
    format: TextInputFormat;
}

export interface TextFieldObj extends ShapeObj, TextObj {
    value: string;
    type: 'TextField';
}

export interface TableCellObj extends ShapeObj {
    width: number;
    height: number;
    verticalAlign: 'top' | 'middle' | 'bottom';
    horizontalAlign: 'left' | 'center' | 'right';
    content: TextInputObj | TextFieldObj;
    type: 'TableCell';
}

export interface TextTableObj extends ShapeObj {
    rows: TableCellObj[][];
    border?: { width: number, color: string };
    type: 'TextTable';
}
export interface ImageObj extends ShapeObj {
    src: string;
    width: number;
    height: number;
    type: 'Image';
}

export interface SolidShapeObj {
    fill: string | undefined;
    stroke: string | undefined;
    strokeWidth: number;
}

export interface ShapeColor {
    fill: string | undefined;
    stroke: string | undefined;
}

export interface ToolBarProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>;
    setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
export interface CanvasStarterData {
    name: string;
    canvasDesign: CanvasDesignData;
}

export type FormInputs = (TextInputObj | TextTableObj)[];

export type ShapeType = 'Rectangle' | 'RoundedRectangle' | 'Ellipse' | 'Line' | 'TextInput' | 'TextField' | 'TextTable' | 'TableCell' | 'Image';

export type TextInputFormat = 'text' | 'number' | 'date' | 'email' | 'phone' | 'paragraph' | 'currency';
