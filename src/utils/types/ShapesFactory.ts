import { generateShapeId } from '../id-util';
import { getWebCanvasWidth, getWebCanvasHeight } from '../page-util';
import { RectangleObj, EllipseObj, LineObj, TextInputObj, TextFieldObj, ImageObj } from './CanvasInterfaces';
export function createRectangleObj(width: number, height: number, fill: string): RectangleObj {
    return {
        id: 'rectangle-' + generateShapeId(),
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

export function createEllipseObj(radiusX: number, radiusY:number, fill: string): EllipseObj {
    return {
        id: 'ellipse-' + generateShapeId(),
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
        id: 'line-' + generateShapeId(),
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
        id: 'text-input-' + generateShapeId(),
        type: 'TextInput',
        x: getWebCanvasWidth() / 2,
        y: getWebCanvasHeight() / 2,
        rotation: 0,
        displayName,
        fontSize,
        fill,
        fontFamily,
        fontStyle,
        textDecoration,
        isDragging: false,
    };
}

export function createTextFieldObj(value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string): TextFieldObj {
    return {
        id: 'text-field-' + generateShapeId(),
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
        isDragging: false,
    };
}

export function createImageObj(src: string, width: number, height: number): ImageObj {
    return {
        id: 'image-' + generateShapeId(),
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
