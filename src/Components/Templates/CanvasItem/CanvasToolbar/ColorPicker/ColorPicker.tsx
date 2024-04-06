import React, { useState } from 'react';
import { Button, Slider, Tooltip, Popover } from 'antd';
import { SketchPicker } from 'react-color'; // Assuming use of react-color for color picking as Ant Design doesn't have a built-in color picker
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { SolidShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import {MdColorLens as ColorSelectorIcon} from 'react-icons/md';

interface ColorPickerProps {
  solidShapeObj: SolidShapeObj;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ solidShapeObj }) => {
  const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

  // State for color change mode (fill or stroke)
  const [colorChangeMode, setColorChangeMode] = useState<'fill' | 'stroke'>('fill');
  // State for stroke width
  const [strokeWidth, setStrokeWidth] = useState<number>(1);

  // Handle changing the color of the selected shape
  const onColorChange = (color: { hex: string }) => {
    updateShapeProperty(
      canvasDesign,
      setCanvasDesign,
      colorChangeMode,
      color.hex,
      selectedId
    );
  };

  // ColorPicker popover content
  const content = (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button.Group>
          <Button 
            type={colorChangeMode === 'fill' ? 'primary' : 'default'} 
            onClick={() => setColorChangeMode('fill')}
          >
            Fill
          </Button>
          <Button 
            type={colorChangeMode === 'stroke' ? 'primary' : 'default'} 
            onClick={() => setColorChangeMode('stroke')}
          >
            Stroke
          </Button>
        </Button.Group>
      </div>
      <SketchPicker
        color={colorChangeMode === 'fill' ? solidShapeObj.fill : solidShapeObj.stroke}
        onChangeComplete={onColorChange}
      />
      {colorChangeMode === 'stroke' && (
        <div>
          <Tooltip title="Stroke Width">
            <Slider
              min={1}
              max={20}
              onChange={(value) => setStrokeWidth(value)}
              value={typeof strokeWidth === 'number' ? strokeWidth : 0}
              marks={{1: '1', 20: '20'}}
            />
          </Tooltip>
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        <Button block onClick={() => onColorChange({ hex: '' })}>
          Remove {colorChangeMode}
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      title="Color Picker"
      trigger="click"
    >
      <Button icon={<ColorSelectorIcon />} />
    </Popover>
  );
};

export default ColorPicker;