import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { SolidShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { ColorPicker } from "antd";
import type { ColorPickerProps } from 'antd';
import { Color } from 'antd/es/color-picker';
import { MdFormatColorFill } from "react-icons/md";

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
        <ColorPicker
            value={value}
            onChangeComplete={(color: Color) => {
                handleColorChange(color);
            }}
            allowClear={true}
            disabledAlpha={true}
            panelRender={(panel) => (
                <div>
                    <Typography.Text style={{ marginRight: 8 }}>Fill Color:</Typography.Text>
                    {panel}
                </div>
            )}
        >
            <Button icon={<MdFormatColorFill style={{ color: isTransparent(solidShapeObj.fill) ? 'black' : solidShapeObj.fill }} />} />
        </ColorPicker>
    );
};

export default FillColorPicker;