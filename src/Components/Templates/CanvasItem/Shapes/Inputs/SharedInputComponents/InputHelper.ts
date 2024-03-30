// utils/konvaHelpers.ts
import Konva from 'konva';
import { TextBase } from '../../../../../../utils/types/CanvasInterfaces';

// constants.ts
export const PADDING = 10;
export const MIN_BOX_SIZE = 5;
export const ALIGN_OFFSET = 5;
export const ROTATION_SNAPS = [0, 90, 180, 270];
export const FILL_COLOR = '#F5F5F5';


export const createTempTextKonvaShape = (content: TextBase): Konva.Text => new Konva.Text({
    text: content.value,
    fontSize: content.fontSize,
    fontFamily: content.fontFamily,
    fontStyle: content.fontStyle,
    textDecoration: content.textDecoration,
    align: content.align,
});

export const getXAlignment = (text: TextBase, containerWidth: number): number => {
    switch (text.align) {
        case 'left':
            return ALIGN_OFFSET;
        case 'center':
            return containerWidth / 2;
        case 'right':
            return containerWidth - ALIGN_OFFSET;
        default:
            return ALIGN_OFFSET;
    }
};

export const getYAlignment = (contentHeight: number): number => contentHeight / 2 - ALIGN_OFFSET;