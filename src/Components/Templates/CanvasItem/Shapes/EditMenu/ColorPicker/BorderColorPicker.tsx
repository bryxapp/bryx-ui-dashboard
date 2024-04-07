import React, { useState } from 'react';
import { Button, Slider, Typography } from 'antd';
import { updateShapeProperty } from '../../../../../../utils/shapeManagementUtils';
import { SolidShapeObj } from '../../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
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

    const handleColorChange = (color: Color) => {
        setValue(color);
        updateShapeProperty(
            canvasDesign,
            setCanvasDesign,
            'stroke',
            color.toHexString(),
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
            <Button icon={<MdBorderColor style={{ color: solidShapeObj.stroke }} />} />
        </ColorPicker>
    );
};

export default BorderColorPicker;