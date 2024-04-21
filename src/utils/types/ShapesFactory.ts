import { generateShapeId, getTextWidthAndHeight } from '../shapeManagementUtils';
import { RectangleObj, EllipseObj, ImageObj, CanvasDesignData, PhoneInputObj, EmailInputObj, HeadingObj, ParagraphObj, ShortTextInputObj, LongTextInputObj, DateInputObj, TableInputObj, DateFormatOption, InputContentObj, TableCellObj, InputLabelObj } from './CanvasInterfaces';

const [defaultStartX, defaultStartY] = [100, 100];

export function createRectangleObj(width: number, height: number, fill: string, stroke: string, strokeWidth: number): RectangleObj {
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
    };
}

export function createRoundedRectangleObj(width: number, height: number, fill: string, stroke: string, strokeWidth: number, cornerRadius: number): RectangleObj {
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
    };
}

export function createEllipseObj(radiusX: number, radiusY: number, fill: string, stroke: string, strokeWidth: number): EllipseObj {
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
    };
}

export function createPhoneInputObj(label: string, hasLabel: boolean, placeHolder: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, isNestedInTextTable: boolean, x?: number, y?: number): PhoneInputObj {
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
        horizontalAlign: "left",
    } as InputLabelObj;

    const contentObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        placeHolder,
        horizontalAlign: "left",
        width: 100,
        height: 50,
    } as InputContentObj;

    return {
        id: generateShapeId(),
        type: 'PhoneInput',
        x,
        y,
        rotation: 0,
        label: labelObj,
        hasLabel,
        content: contentObj,
    };
}

export function createEmailInputObj(label: string, hasLabel: boolean, placeHolder: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, isNestedInTextTable: boolean, x?: number, y?: number): EmailInputObj {
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
        horizontalAlign: "left",
    } as InputLabelObj;

    const contentObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        placeHolder,
        horizontalAlign: "left",
        width: 100,
        height: 50,
    } as InputContentObj;

    return {
        id: generateShapeId(),
        type: 'EmailInput',
        x,
        y,
        rotation: 0,
        label: labelObj,
        hasLabel,
        content: contentObj,
    };
}

export function createShortTextInputObj(label: string, hasLabel: boolean, placeHolder: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, isNestedInTextTable: boolean, x?: number, y?: number): ShortTextInputObj {
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
        horizontalAlign: "left",
    } as InputLabelObj;


    const [width,] = getTextWidthAndHeight(labelObj, placeHolder)

    const contentObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        placeHolder,
        horizontalAlign: "left",
    } as InputContentObj;

    return {
        id: generateShapeId(),
        type: 'ShortTextInput',
        x,
        y,
        rotation: 0,
        label: labelObj,
        hasLabel,
        content: contentObj,
        inputWidth: width + 20,
    };
}

export function createLongTextInputObj(label: string, hasLabel: boolean, placeHolder: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, isNestedInTextTable: boolean, x?: number, y?: number): LongTextInputObj {
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
        horizontalAlign: "left",
    } as InputLabelObj;

    const contentObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        placeHolder,
        horizontalAlign: "left",
    } as InputContentObj;

    const [width,height] = getTextWidthAndHeight(labelObj, placeHolder)

    return {
        id: generateShapeId(),
        type: 'LongTextInput',
        x,
        y,
        rotation: 0,
        label: labelObj,
        hasLabel,
        content: contentObj,
        verticalAlign: "top",
        inputHeight: height + 20,
        inputWidth:  width + 20,
    };
}

export function createDateInputObj(label: string, hasLabel: boolean, placeHolder: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, dateFormat: DateFormatOption, isNestedInTextTable: boolean, x?: number, y?: number): DateInputObj {
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
        horizontalAlign: "left",
    } as InputLabelObj;

    const contentObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        placeHolder,
        horizontalAlign: "left",
    } as InputContentObj;

    return {
        id: generateShapeId(),
        type: 'DateInput',
        x,
        y,
        rotation: 0,
        label: labelObj,
        hasLabel,
        content: contentObj,
        dateFormat: dateFormat,
    };
}

export function createTableInputObj(label: string, hasLabel: boolean, placeHolder: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, isNestedInTextTable: boolean, x?: number, y?: number): TableInputObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }

    const contentObj = {
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        placeHolder,
        horizontalAlign: "left",
    } as InputContentObj;

    const cells = [
        [{ content: contentObj, width: 100, height: 50 }],
        [{ content: contentObj, width: 100, height: 50 }],
    ] as TableCellObj[][];

    return {
        id: generateShapeId(),
        type: 'TableInput',
        x,
        y,
        rotation: 0,
        cells,
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
        horizontalAlign: "left",
    };
}

export function createUserImageObj(src: string, width: number, height: number): ImageObj {
    return {
        id: generateShapeId(),
        type: 'UserImage',
        x: defaultStartX,
        y: defaultStartY,
        rotation: 0,
        src,
        width,
        height,
    };
}

export function createStockImageObj(src: string, width: number, height: number): ImageObj {
    return {
        id: generateShapeId(),
        type: 'StockImage',
        x: defaultStartX,
        y: defaultStartY,
        rotation: 0,
        src,
        width,
        height,
    };
}

export function createEmptyCanvasDesign(pageWidth: number, pageHeight: number): CanvasDesignData {
    return {
        Shapes: [],
        inputOrder: [],
        pageWidth,
        pageHeight,
    };
}
