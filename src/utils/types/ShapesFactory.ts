import { generateShapeId } from '../shapeid-util';
import { getWebCanvasWidth, getWebCanvasHeight } from '../page-util';
import { RectangleObj, EllipseObj, LineObj, TextInputObj, TextFieldObj, ImageObj, TextTableObj, TableCellObj } from './CanvasInterfaces';

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
    const startX = defaultStartX; // Assume this is defined elsewhere
    const startY = defaultStartY; // Assume this is defined elsewhere
    const rows: TableCellObj[][] = []; // Define rows as an array of arrays of TableCellObj

    for (let i = 0; i < numberOfRows; i++) {
        const currentRowY = startY + i * cellHeight;
        const row: TableCellObj[] = [];

        for (let j = 0; j < numberOfCols; j++) {
            const cell: TableCellObj = {
                id: generateShapeId(),
                x: startX + j * cellWidth,
                y: currentRowY,
                rotation: 0,
                isDragging: false,
                width: cellWidth,
                height: cellHeight,
                verticalAlign: 'middle',
                type: 'TableCell',
                content: {} as TextInputObj | TextFieldObj, // Placeholder for actual content
            };

            if (i === 0) {
                // First row, create TextField objects
                cell.content = createTextFieldObj(`text-field`, 12, 'black', 'Arial', 'normal', 'none', startX + j * cellWidth, currentRowY);
            } else {
                // Subsequent rows, create TextInput objects
                cell.content = createTextInputObj(`text-input`, 12, 'black', 'Arial', 'normal', 'none', startX + j * cellWidth, currentRowY);
            }

            row.push(cell);
        }

        rows.push(row);
    }

    return {
        id: generateShapeId(), // Assume this function is defined elsewhere
        type: 'TextTable',
        x: startX,
        y: startY,
        rotation: 0,
        rows,
        isDragging: false,
        // Assuming TextTableObj includes properties for overall width and height
        // These would need to be calculated if they are dynamic
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
