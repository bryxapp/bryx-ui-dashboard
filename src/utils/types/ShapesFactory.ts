import { generateShapeId } from '../shapeid-util';
import { getWebCanvasWidth, getWebCanvasHeight } from '../page-util';
import { RectangleObj, EllipseObj, LineObj, TextInputObj, TextFieldObj, ImageObj } from './CanvasInterfaces';
export function createRectangleObj(width: number, height: number, fill: string): RectangleObj {
    return {
        id: generateShapeId(),
        type: 'Rectangle',
        x: getWebCanvasWidth() / 2,
        y: getWebCanvasHeight() / 2,
        rotation: 0,
        width,
        height,
        fill,
        isDragging: false,
    };
}

export function createRoundedRectangleObj(width: number, height: number, fill: string, cornerRadius: number): RectangleObj {
    return {
        id: generateShapeId(),
        type: 'RoundedRectangle',
        x: getWebCanvasWidth() / 2,
        y: getWebCanvasHeight() / 2,
        rotation: 0,
        width,
        height,
        fill,
        cornerRadius,
        isDragging: false,
    };
}

export function createEllipseObj(radiusX: number, radiusY:number, fill: string): EllipseObj {
    return {
        id: generateShapeId(),
        type: 'Ellipse',
        x: getWebCanvasWidth() / 2,
        y: getWebCanvasHeight() / 2,
        rotation: 0,
        radiusX,
        radiusY,
        fill,
        isDragging: false,
    };
}

export function createLineObj(points: number[], stroke: string, strokeWidth: number): LineObj {
    return {
        id: generateShapeId(),
        type: 'Line',
        x: getWebCanvasWidth() / 2,
        y: getWebCanvasHeight() / 2,
        rotation: 0,
        points,
        stroke,
        strokeWidth,
        isDragging: false,
    };
}

export function createTextInputObj(displayName: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string): TextInputObj {
    return {
        id: generateShapeId(),
        type: 'TextInput',
        format: 'text',
        x: getWebCanvasWidth() / 2,
        y: getWebCanvasHeight() / 2,
        rotation: 0,
        displayName,
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        align:"left",
        isDragging: false,
    };
}

export function createTextFieldObj(value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string): TextFieldObj {
    return {
        id: generateShapeId(),
        type: 'TextField',
        x: getWebCanvasWidth() / 2,
        y: getWebCanvasHeight() / 2,
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
        x: getWebCanvasWidth() / 2,
        y: getWebCanvasHeight() / 2,
        rotation: 0,
        src,
        width,
        height,
        isDragging: false,
    };
}
