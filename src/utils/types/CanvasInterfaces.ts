
export interface CanvasDesignData {
    Shapes: (ShapeObj)[];
    pageHeight: number;
    pageWidth: number;
}

export interface ShapeObj {
    id: string;
    type: ShapeType | InputType | TextType | ImageType;
    x: number;
    y: number;
    rotation: number;
    isDragging: boolean;
}

// Solid Shapes
export interface RectangleObj extends SolidShapeObj {
    width: number;
    height: number;
    cornerRadius?: number;
    type: 'Rectangle' | 'RoundedRectangle';
}

export interface EllipseObj extends SolidShapeObj {
    radiusX: number;
    radiusY: number;
    type: 'Ellipse';
}

export interface ImageObj extends ShapeObj {
    src: string;
    width: number;
    height: number;
    type: 'Image';
}

export interface SolidShapeObj extends ShapeObj {
    fill: string;
    stroke: string;
    strokeWidth: number;
}

// Input Shapes

export interface PhoneInputObj extends InputObj {
    type: 'PhoneInput';
}

export interface ShortTextInputObj extends InputObj {
    type: 'ShortTextInput';
}

export interface LongTextInputObj extends InputObj {
    type: 'LongTextInput';
}

export interface EmailInputObj extends InputObj {
    type: 'EmailInput';
}

export interface DateInputObj extends InputObj {
    type: 'DateInput';
}

// Text Shapes
export interface HeadingObj extends TextObj {
    type: 'Heading';
}

export interface ParagraphObj extends TextObj {
    type: 'Paragraph';
}

export interface TextObj extends TextBase, ShapeObj {
}

export interface TextBase {
    fontSize: number;
    fill: string;
    fontFamily: string;
    fontStyle: string;
    textDecoration: string;
    align: string;
    value: string;
}

export interface InputObj extends ShapeObj {
    hasLabel: boolean;
    label: TextBase;
    content: TextBase;
}
export interface CanvasStarterData {
    name: string;
    canvasDesign: CanvasDesignData;
}

export type FormInputs = (ShortTextInputObj | LongTextInputObj | PhoneInputObj | EmailInputObj | DateInputObj)[];

export type ShapeType = 'Rectangle' | 'RoundedRectangle' | 'Ellipse';
export const ShapeTypes: ShapeType[] = ['Rectangle', 'RoundedRectangle', 'Ellipse'];
export type ImageType = 'Image';
export const ImageTypes: ImageType[] = ['Image'];
export type InputType = 'PhoneInput' | 'ShortTextInput' | 'LongTextInput' | 'EmailInput' | 'DateInput';
export const InputTypes: InputType[] = ['PhoneInput', 'ShortTextInput', 'LongTextInput', 'EmailInput', 'DateInput'];
export type TextType = 'Heading' | 'Paragraph'
export const TextTypes: TextType[] = ['Heading', 'Paragraph'];
export type TextInputFormat = 'text' | 'number' | 'date' | 'email' | 'phone' | 'paragraph' | 'currency';
