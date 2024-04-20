// utils/konvaHelpers.ts
import Konva from 'konva';
import { TextBase, TextValueObj } from '../../../../../../utils/types/CanvasInterfaces';
import { getTextWidthAndHeight } from '../../../../../../utils/shapeManagementUtils';

// constants.ts
export const MIN_BOX_SIZE = 5;
export const ROTATION_SNAPS = [0, 90, 180, 270];
export const FILL_COLOR = '#F2F2F2';

export const createTempTextKonvaShape = (shapeProperties: TextBase, value: string,): Konva.Text => new Konva.Text({
    text: value,
    fontSize: shapeProperties.fontSize,
    fontFamily: shapeProperties.fontFamily,
    fontStyle: shapeProperties.fontStyle,
    textDecoration: shapeProperties.textDecoration,
    horizontalAlign: shapeProperties.horizontalAlign,
});

export const getXAlignment = (text: TextValueObj, containerWidth: number): number => {
    const [textWidth,] = getTextWidthAndHeight(text, text.value);
    switch (text.horizontalAlign) {
        case 'left':
            return 0;
        case 'center':
            return (containerWidth - textWidth) / 2;
        case 'right':
            return containerWidth - textWidth;
        default:
            return 0;
    }
};

export const getYAlignment = (text: TextValueObj, containerHeight: number, verticalAlign: string): number => {
    const [, textHeight] = getTextWidthAndHeight(text, text.value); // Ignoring the first value
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

