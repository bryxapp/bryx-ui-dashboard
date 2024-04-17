
export interface CanvasDesignData {
    Shapes: (ShapeObj)[];
    inputOrder: string[];
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
}

export interface UserImageObj extends ImageObj {
    type: 'UserImage';
}

export interface StockImageObj extends ImageObj {
    type: 'StockImage';
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
    dateFormat: DateFormatOption
}

export interface TableInputObj extends TableObj {
    type: 'TableInput';
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

export interface TableObj extends ShapeObj {
    content: TextBase;
}

export interface CanvasStarterData {
    name: string;
    canvasDesign: CanvasDesignData;
}

export type FormInputs = (ShortTextInputObj | LongTextInputObj | PhoneInputObj | EmailInputObj | DateInputObj)[];

export type SolidShapeType = 'Rectangle' | 'RoundedRectangle' | 'Ellipse';
export const SolidShapeTypes: SolidShapeType[] = ['Rectangle', 'RoundedRectangle', 'Ellipse'];
export type ImageType = 'UserImage' | 'StockImage';
export const ImageTypes: ImageType[] = ['UserImage', 'StockImage'];
export type InputType = 'PhoneInput' | 'ShortTextInput' | 'LongTextInput' | 'EmailInput' | 'DateInput' | 'TableInput';
export const InputTypes: InputType[] = ['PhoneInput', 'ShortTextInput', 'LongTextInput', 'EmailInput', 'DateInput'];
export type TextType = 'Heading' | 'Paragraph'
export const TextTypes: TextType[] = ['Heading', 'Paragraph'];
export type TextInputFormat = 'text' | 'number' | 'date' | 'email' | 'phone' | 'paragraph' | 'currency';
export type ShapeType = SolidShapeType | InputType | TextType | ImageType;

export type DateFormatOption =
    'MM/dd/yy' |
    'MM/dd/yyyy' |
    'MMMM d, yyyy' |
    'MMM d, yyyy';

export const DateFormatOptions: DateFormatOption[] = ['MM/dd/yy', 'MM/dd/yyyy', 'MMMM d, yyyy', 'MMM d, yyyy'];

