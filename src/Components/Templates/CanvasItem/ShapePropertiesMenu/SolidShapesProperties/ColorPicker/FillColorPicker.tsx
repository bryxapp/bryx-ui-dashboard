import React, { useState } from 'react';
import { Typography } from 'antd';
import { updateShapeProperty } from '../../../../../../utils/shapeManagementUtils';
import { SolidShapeObj } from '../../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import { ColorPicker } from "antd";
import type { ColorPickerProps } from 'antd';
import { Color } from 'antd/es/color-picker';

interface FillColorPickerProps {
    solidShapeObj: SolidShapeObj;
}

const FillColorPicker: React.FC<FillColorPickerProps> = ({ solidShapeObj }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const [value, setValue] = useState<ColorPickerProps['value']>(solidShapeObj.fill);

    const isTransparent = (hexString: string) => {
        if (hexString === 'transparent') {
            return true;
        }

        if (
            hexString.length === 9 &&
            hexString[7] === '0' &&
            hexString[8] === '0') {
            return true;
        }
    }

    // Handle changing the color of the selected shape
    const handleColorChange = (color: Color) => {
        setValue(color);

        const hexString = color.toHexString();
        let fillColor = hexString;
        if (isTransparent(hexString)) {
            fillColor = 'transparent';
        }

        updateShapeProperty(
            canvasDesign,
            setCanvasDesign,
            'fill',
            fillColor,
            selectedId
        );
    };

    // ColorPicker popover content
    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography.Text style={{ marginRight: '1rem', width: '4rem' }}>Fill</Typography.Text>
            <ColorPicker
                value={value}
                onChangeComplete={(color: Color) => {
                    handleColorChange(color);
                }}
                allowClear={true}
                disabledAlpha={true}
            />
        </div>
    );
};

export default FillColorPicker;