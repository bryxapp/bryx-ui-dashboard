import { getWebCanvasWidth, getWebCanvasHeight } from '../page-util';
import { RectangleObj, CircleObj, LineObj, TextInputObj, TextFieldObj, ImageObj } from './CanvasInterfaces';
export function createRectangleObj(index: number, width: number, height: number, fill: string): RectangleObj {
    return {
        id: 'rectangle-' + index,
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

export function createCircleObj(index: number, radius: number, fill: string): CircleObj {
    return {
        id: 'circle-' + index,
        type: 'Circle',
        x: getWebCanvasWidth() / 2,
        y: getWebCanvasHeight() / 2,
        rotation: 0,
        radius,
        fill,
        isDragging: false,
    };
}

export function createLineObj(index: number, points: number[], stroke: string, strokeWidth: number): LineObj {
    return {
        id: 'line-' + index,
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

export function createTextInputObj(index: number, displayName: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string): TextInputObj {
    return {
        id: 'text-input-' + index,
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

export function createTextFieldObj(index: number, value: string, fontSize: number, fill: string, fontFamily: string, fontStyle: string, textDecoration: string): TextFieldObj {
    return {
        id: 'text-field-' + index,
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

export function createImageObj(index: number, src: string, width: number, height: number): ImageObj {
    return {
        id: 'image-' + index,
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
