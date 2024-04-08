import React, { useState } from 'react';
import { Button, Slider, Typography } from 'antd';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { SolidShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { ColorPicker } from "antd";
import type { ColorPickerProps } from 'antd';
import { Color } from 'antd/es/color-picker';
import { MdBorderColor } from "react-icons/md";

interface BorderColorPickerProps {
    solidShapeObj: SolidShapeObj;
}

const BorderColorPicker: React.FC<BorderColorPickerProps> = ({ solidShapeObj }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const [value, setValue] = useState<ColorPickerProps['value']>(solidShapeObj.stroke);
    const [strokeWidth, setStrokeWidth] = useState<number>(solidShapeObj.strokeWidth);

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

    const handleColorChange = (color: Color) => {
        setValue(color);
        const hexString = color.toHexString();
        let strokeColor = hexString;
        if (isTransparent(hexString)) {
            strokeColor = 'transparent';
        }

        updateShapeProperty(
            canvasDesign,
            setCanvasDesign,
            'stroke',
            strokeColor,
            selectedId
        );
    };

    const handleStrokeWidthChange = (value: number) => {
        setStrokeWidth(value);
        updateShapeProperty(
            canvasDesign,
            setCanvasDesign,
            'strokeWidth',
            value,
            selectedId
        );
    }

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
                    <Typography.Text style={{ marginRight: 8 }}>Stroke Color:</Typography.Text>
                    {panel}
                    <div style={{ height: 16 }} />
                    <Typography.Text style={{ marginRight: 8 }}>Stroke Width:</Typography.Text>
                    <Slider
                        min={1}
                        max={20}
                        onChange={(value) => handleStrokeWidthChange(value)}
                        value={typeof strokeWidth === 'number' ? strokeWidth : 0}
                        marks={{ 1: '1', 20: '20' }}
                    />
                </div>
            )}
        >
            <Button icon={<MdBorderColor style={{ color: isTransparent(solidShapeObj.stroke) ? 'black' : solidShapeObj.stroke }} />} />
        </ColorPicker>
    );
};

export default BorderColorPicker;