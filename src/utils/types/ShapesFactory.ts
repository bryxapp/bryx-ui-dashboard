import { generateShapeId } from '../shapeManagementUtils';
import { RectangleObj, EllipseObj, LineObj, ImageObj, CanvasDesignData, PhoneInputObj, TextBase, EmailInputObj, HeadingObj, ParagraphObj, ShortTextInputObj } from './CanvasInterfaces';

const [defaultStartX, defaultStartY] = [100, 100];

export function createRectangleObj(width: number, height: number, fill: string | undefined, stroke: string | undefined, strokeWidth: number): RectangleObj {
    return {
        id: generateShapeId(),
        type: 'Rectangle',
        x: defaultStartX,
        y: defaultStartY,
        rotation: 0,
        width,
        height,
        fill,
        stroke,
        strokeWidth,
        isDragging: false,
    };
}

export function createRoundedRectangleObj(width: number, height: number, fill: string | undefined, stroke: string | undefined, strokeWidth: number, cornerRadius: number): RectangleObj {
    return {
        id: generateShapeId(),
        type: 'RoundedRectangle',
        x: defaultStartX,
        y: defaultStartY,
        rotation: 0,
        width,
        height,
        fill,
        stroke,
        strokeWidth,
        cornerRadius,
        isDragging: false,
    };
}

export function createEllipseObj(radiusX: number, radiusY: number, fill: string | undefined, stroke: string | undefined, strokeWidth: number): EllipseObj {
    return {
        id: generateShapeId(),
        type: 'Ellipse',
        x: defaultStartX,
        y: defaultStartY,
        rotation: 0,
        radiusX,
        radiusY,
        fill,
        stroke,
        strokeWidth,
        isDragging: false,
    };
}

export function createLineObj(points: number[], stroke: string, strokeWidth: number): LineObj {
    return {
        id: generateShapeId(),
        type: 'Line',
        x: defaultStartX,
        y: defaultStartY,
        rotation: 0,
        points,
        stroke,
        strokeWidth,
        isDragging: false,
    };
}

export function createPhoneInputObj(label: string, hasLabel: boolean, placeholder: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, isNestedInTextTable: boolean, x?: number, y?: number): PhoneInputObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }

    const labelObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        value: label,
        align: "left",
    } as TextBase;

    const contentObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        value: placeholder,
        align: "left",
    } as TextBase;

    return {
        id: generateShapeId(),
        type: 'PhoneInput',
        x,
        y,
        rotation: 0,
        label: labelObj,
        hasLabel,
        content: contentObj,
        isDragging: false,
    };
}

export function createEmailInputObj(label: string, hasLabel: boolean, placeholder: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, isNestedInTextTable: boolean, x?: number, y?: number): EmailInputObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }

    const labelObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        value: label,
        align: "left",
    } as TextBase;

    const contentObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        value: placeholder,
        align: "left",
    } as TextBase;

    return {
        id: generateShapeId(),
        type: 'EmailInput',
        x,
        y,
        rotation: 0,
        label: labelObj,
        hasLabel,
        content: contentObj,
        isDragging: false,
    };
}

export function createShortTextInputObj(label: string, hasLabel: boolean, placeholder: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, isNestedInTextTable: boolean, x?: number, y?: number): ShortTextInputObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }

    const labelObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        value: label,
        align: "left",
    } as TextBase;

    const contentObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        value: placeholder,
        align: "left",
    } as TextBase;

    return {
        id: generateShapeId(),
        type: 'ShortTextInput',
        x,
        y,
        rotation: 0,
        label: labelObj,
        hasLabel,
        content: contentObj,
        isDragging: false,
    };
}


export function createHeadingdObj(value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, x?: number, y?: number): HeadingObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }

    return {
        id: generateShapeId(),
        type: 'Heading',
        x,
        y,
        rotation: 0,
        value,
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        align: "left",
        isDragging: false,
    };
}

export function createParagraphObj(value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, x?: number, y?: number): ParagraphObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }

    return {
        id: generateShapeId(),
        type: 'Paragraph',
        x,
        y,
        rotation: 0,
        value,
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        align: "left",
        isDragging: false,
    };
}

export function createImageObj(src: string, width: number, height: number): ImageObj {
    return {
        id: generateShapeId(),
        type: 'Image',
        x: defaultStartX,
        y: defaultStartY,
        rotation: 0,
        src,
        width,
        height,
        isDragging: false,
    };
}

export function createEmptyCanvasDesign(pageWidth: number, pageHeight: number): CanvasDesignData {
    return {
        Shapes: [],
        selectedId: null,
        pageWidth,
        pageHeight,
    };
}
