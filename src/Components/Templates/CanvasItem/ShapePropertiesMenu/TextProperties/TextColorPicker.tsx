import React from 'react';
import { ColorPicker } from 'antd';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import {updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface ColorPickerProps {
    textObj: TextBase;
    disabled?: boolean;
}

const TextColorPicker: React.FC<ColorPickerProps> = ({ textObj, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const onColorChange = (newColorValue: string) => {
            updateShapeProperty(canvasDesign, setCanvasDesign, 'fill', newColorValue, selectedId);
    };

    return (
            <ColorPicker defaultValue={textObj.fill} onChangeComplete={(color) => {onColorChange(color.toHexString())}} disabled={disabled} />
    );
};

export default TextColorPicker;