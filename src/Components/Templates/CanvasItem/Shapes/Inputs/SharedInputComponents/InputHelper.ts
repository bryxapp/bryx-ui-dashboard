// utils/konvaHelpers.ts
import Konva from 'konva';
import { TextBase } from '../../../../../../utils/types/CanvasInterfaces';

// constants.ts
export const MIN_BOX_SIZE = 5;
export const ROTATION_SNAPS = [0, 90, 180, 270];
export const FILL_COLOR = '#999999';

export const createTempTextKonvaShape = (shapeProperties: TextBase, value?: string,): Konva.Text => new Konva.Text({
    text: value || shapeProperties.value,
    fontSize: shapeProperties.fontSize,
    fontFamily: shapeProperties.fontFamily,
    fontStyle: shapeProperties.fontStyle,
    textDecoration: shapeProperties.textDecoration,
    align: shapeProperties.align,
});

export const getXAlignment = (text: TextBase, containerWidth: number): number => {
    switch (text.align) {
        case 'left':
            return 0;
        case 'center':
            return containerWidth / 2;
        case 'right':
            return containerWidth;
        default:
            return 0;
    }
};

export const getYAlignment = (contentHeight: number): number => 0;
