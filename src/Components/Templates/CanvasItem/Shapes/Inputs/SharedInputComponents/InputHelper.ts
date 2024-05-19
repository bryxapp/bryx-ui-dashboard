// utils/konvaHelpers.ts
import Konva from 'konva';
import { InputObj, TextBase, TextValueObj } from '../../../../../../utils/types/CanvasInterfaces';
import { getTextWidthAndHeight } from '../../../../../../utils/shapeManagementUtils';

// constants.ts
export const MIN_BOX_SIZE = 5;
export const ROTATION_SNAPS = [0, 90, 180, 270];
export const FILL_COLOR = '#E0E0E0';

export const createTempTextKonvaShape = (shapeProperties: TextBase | null, value: string | undefined): Konva.Text => {
    if (!shapeProperties) return new Konva.Text(
        {
            text: '',
            fontSize: 0,
        }
    );

    if (value === null) throw new Error('Value cannot be null');

    return new Konva.Text({
        text: value,
        fontSize: shapeProperties.fontSize,
        fontFamily: shapeProperties.fontFamily,
        fontStyle: shapeProperties.fontStyle,
        textDecoration: shapeProperties.textDecoration,
    });
}

export const getYAlignment = (textHeight: number, verticalAlign: string, containerHeight: number): number => {
    if (textHeight > containerHeight) {
        return 0;
    }
    switch (verticalAlign) {
        case 'top':
            return 0;
        case 'middle':
            return (containerHeight - textHeight) / 2;
        case 'bottom':
            return containerHeight - textHeight;
        default:
            return 0;
    }
}

export const getXAlignment = (textWidth: number, horizontalAlign: string, containerWidth: number): number => {
    if (textWidth > containerWidth) {
        return 0;
    }
    switch (horizontalAlign) {
        case 'left':
            return 0;
        case 'center':
            return (containerWidth - textWidth) / 2;
        case 'right':
            return containerWidth - textWidth;
        default:
            return 0;
    }
}

export const getTextXAlignment = (text: TextValueObj, containerWidth: number, horizontalAlign: string): number => {
    const [textWidth,] = getTextWidthAndHeight(text);
    return getXAlignment(textWidth, horizontalAlign, containerWidth);
};

export const getTextYAlignment = (text: TextValueObj, containerHeight: number, verticalAlign: string): number => {
    const [, textHeight] = getTextWidthAndHeight(text);
    return getYAlignment(textHeight, verticalAlign, containerHeight);
}

export const getInputXAlignment = (text: InputObj, containerWidth: number): number => {
    const [textWidth,] = getTextWidthAndHeight(text);
    return getXAlignment(textWidth, text.horizontalAlign, containerWidth);
}

export const getInputYAlignment = (text: TextValueObj, containerHeight: number, verticalAlign: string): number => {
    const [, textHeight] = getTextWidthAndHeight(text);
    return getYAlignment(textHeight, verticalAlign, containerHeight);
}

