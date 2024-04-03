import React from 'react';
import { Typography, ColorPicker } from 'antd';
import { updateInputProperty, updateShapeProperty } from '../../../../../../utils/shapeManagementUtils';
import { TextBase } from '../../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import { MuiColorInput } from 'mui-color-input'

interface ColorPickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
}

const TextColorPicker: React.FC<ColorPickerProps> = ({ textObj, itemType }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const onColorChange = (newColorValue: string) => {
        if (itemType === null)
            updateShapeProperty(canvasDesign, setCanvasDesign, 'fill', newColorValue, selectedId);
        else {
            updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'fill', newColorValue, selectedId);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Text strong style={{ marginBottom: '8px' }}>Font Color</Typography.Text>
            <ColorPicker defaultValue={textObj.fill} onChangeComplete={(color) => {onColorChange(color.toHexString())}} />
            <MuiColorInput format="hex" value={textObj.fill} onChange={onColorChange} sx={{ width: '8em' }} />
        </div>
    );
};

export default TextColorPicker;