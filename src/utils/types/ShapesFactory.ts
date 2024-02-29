import { generateShapeId } from '../shapeid-util';
import { getWebCanvasWidth, getWebCanvasHeight } from '../page-util';
import { RectangleObj, EllipseObj, LineObj, TextInputObj, TextFieldObj, ImageObj, TextTableObj } from './CanvasInterfaces';

const defaultStartX = getWebCanvasWidth() / 4;
const defaultStartY = getWebCanvasHeight() / 4;

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

export function createTextInputObj(displayName: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, x?: number, y?: number): TextInputObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }
    return {
        id: generateShapeId(),
        type: 'TextInput',
        format: 'text',
        x,
        y,
        rotation: 0,
        displayName,
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        align: "left",
        isDragging: false,
    };
}

export function createTextFieldObj(value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string, x?: number, y?: number): TextFieldObj {
    if (x === undefined) {
        x = defaultStartX;
    }
    if (y === undefined) {
        y = defaultStartY;
    }

    return {
        id: generateShapeId(),
        type: 'TextField',
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

export function createTextTableObj(numberOfRows: number, numberOfCols: number, cellWidth: number, cellHeight: number): TextTableObj {
    // Starting position for the table
    const startX = defaultStartX;
    const startY = defaultStartY;

    const rows = [];

    for (let i = 0; i < numberOfRows; i++) {
        // Calculate the Y position of the current row
        const currentRowY = startY + i * cellHeight;
        const row = [];

        if (i === 0) {
            // First row, create 3 TextField objects
            for (let j = 0; j < numberOfCols; j++) {
                row.push(createTextFieldObj(`Text Field`, 12, 'black', 'Arial', 'normal', 'none', startX + j * cellWidth, currentRowY));
            }
        } else {
            // Subsequent rows, create 3 TextInput objects
            for (let j = 0; j < numberOfCols; j++) {
                row.push(createTextInputObj(`Text Input`, 12, 'black', 'Arial', 'normal', 'none', startX + j * cellWidth, currentRowY));
            }
        }

        rows.push(row);
    }

    return {
        id: generateShapeId(), 
        type: 'TextTable',
        x: startX,
        y: startY,
        rotation: 0,
        rows,
        isDragging: false,
        cellWidth,
        cellHeight,
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
