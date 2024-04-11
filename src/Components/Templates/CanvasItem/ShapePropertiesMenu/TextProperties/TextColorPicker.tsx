import React from 'react';
import { ColorPicker } from 'antd';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface ColorPickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
    disabled?: boolean;
}

const TextColorPicker: React.FC<ColorPickerProps> = ({ textObj, itemType, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const onColorChange = (newColorValue: string) => {
        if (itemType === null)
            updateShapeProperty(canvasDesign, setCanvasDesign, 'fill', newColorValue, selectedId);
        else {
            updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'fill', newColorValue, selectedId);
        }
    };

    return (
            <ColorPicker defaultValue={textObj.fill} onChangeComplete={(color) => {onColorChange(color.toHexString())}} disabled={disabled} />
    );
};

export default TextColorPicker;