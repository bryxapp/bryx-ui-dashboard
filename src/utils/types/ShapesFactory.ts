import { format } from 'date-fns';
import { createTempTextKonvaShape } from '../../Components/Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper';
import { generateShapeId } from '../shapeManagementUtils';
import { RectangleObj, EllipseObj, ImageObj, CanvasDesignData, PhoneInputObj, EmailInputObj, HeadingObj, ParagraphObj, ShortTextInputObj, LongTextInputObj, DateInputObj, TableInputObj, DateFormatOption, TableCellObj, CellInputObj, TextCellObj, TextBase } from './CanvasInterfaces';

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

export function createPhoneInputObj(value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, x?: number, y?: number): PhoneInputObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }
    const PHONE_NUMBER_LENGTH = 10;
    const tempText = createTempTextKonvaShape({ fontSize, fontFamily, fontStyle, textDecoration } as TextBase, 'X'.repeat(PHONE_NUMBER_LENGTH));

    return {
        id: generateShapeId(),
        type: 'PhoneInput',
        x,
        y,
        rotation: 0,
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        value,
        horizontalAlign: "left",
        width: tempText.width(),
        height: tempText.height(),
    };
}

export function createEmailInputObj(value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, x?: number, y?: number): EmailInputObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }

    const EMAIL_LENGTH = 20;
    const tempText = createTempTextKonvaShape({ fontSize, fontFamily, fontStyle, textDecoration } as TextBase, 'X'.repeat(EMAIL_LENGTH));

    return {
        id: generateShapeId(),
        type: 'EmailInput',
        x,
        y,
        rotation: 0,
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        value,
        horizontalAlign: "left",
        width: tempText.width(),
        height: tempText.height(),
    };
}

export function createShortTextInputObj(value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, x?: number, y?: number): ShortTextInputObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }

    const tempText = createTempTextKonvaShape({ fontSize, fontFamily, fontStyle, textDecoration } as TextBase, value);

    return {
        id: generateShapeId(),
        type: 'ShortTextInput',
        x,
        y,
        rotation: 0,
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        value,
        horizontalAlign: "left",
        width: 200,
        height: tempText.height(),
    };
}

export function createLongTextInputObj(value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, x?: number, y?: number): LongTextInputObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }


    return {
        id: generateShapeId(),
        type: 'LongTextInput',
        x,
        y,
        rotation: 0,
        verticalAlign: "top",
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        value,
        horizontalAlign: "left",
        width: 200,
        height: 100,
    };
}

export function createDateInputObj(fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, dateFormat: DateFormatOption, x?: number, y?: number): DateInputObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }
    const formattedDate = format(new Date(), dateFormat);
    const tempText = createTempTextKonvaShape({ fontSize, fontFamily, fontStyle, textDecoration } as TextBase, formattedDate);

    return {
        id: generateShapeId(),
        type: 'DateInput',
        x,
        y,
        rotation: 0,
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        value: formattedDate,
        dateFormat,
        horizontalAlign: "left",
        width: tempText.width(),
        height: tempText.height(),
    };
}

export function createInputCellObj(value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, x: number, y: number): CellInputObj {
    return {
        id: generateShapeId(),
        x,
        y,
        value,
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        rotation: 0,
        type: 'CellInput',
    };
}

export function createTableInputObj(numberOfRows: number, numberOfCols: number, cellWidth: number, cellHeight: number, x?: number, y?: number): TableInputObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }

    const rows: TableCellObj[][] = []; // Define rows as an array of arrays of TableCellObj

    for (let i = 0; i < numberOfRows; i++) {
        const currentRowY = x + i * cellHeight;
        const row: TableCellObj[] = [];

        for (let j = 0; j < numberOfCols; j++) {
            const cell: TableCellObj = {
                id: generateShapeId(),
                x: x + j * cellWidth,
                y: currentRowY,
                width: cellWidth,
                height: cellHeight,
                verticalAlign: 'middle',
                horizontalAlign: 'center',
                type: 'TableCell',
                content: null,
                rotation: 0,
            };
            if (i === 0) {
                cell.content = createTextCellObj('Title', 20, 'black', 'Arial', 'bold', 'none', cell.x, cell.y);
            }
            else {
                cell.content = createInputCellObj('', 20, 'black', 'Arial', 'normal', 'none', cell.x, cell.y)
            }
            row.push(cell);
        }
        rows.push(row);
    }

    return {
        id: generateShapeId(),
        type: 'TableInput',
        x,
        y,
        rotation: 0,
        border: { width: 1, color: 'black' },
        rows,
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

export function createTextCellObj(value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, x?: number, y?: number): TextCellObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }

    return {
        id: generateShapeId(),
        type: 'TextCell',
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

export function createUserImageObj(srcUrl: string, width: number, height: number): ImageObj {

    return {
        id: generateShapeId(),
        type: 'UserImage',
        x: defaultStartX,
        y: defaultStartY,
        rotation: 0,
        src: srcUrl,
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
