import React from 'react';
import { Input, Typography } from 'antd';
import { InputObj, ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

interface TextInputSizerProps {
    inputObj: InputObj;
    disabled?: boolean;
}

const TextInputSizer: React.FC<TextInputSizerProps> = ({ inputObj, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const updateShapeProperty = (dimension: 'width' | 'height', event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.round(parseFloat(event.target.value)); // Parse float value for accuracy
        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (shape.id === selectedId) {
                const foundInputObj = shape as InputObj;
                const updatedInputObj = {
                    ...foundInputObj,
                    inputContentShape: { ...foundInputObj.inputContentShape, [dimension]: value },
                };
                return updatedInputObj;
            }
            return shape;
        });
        setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
    };

    const selectedWidth = Math.round(inputObj.inputContentShape.width);
    const selectedHeight = Math.round(inputObj.inputContentShape.height);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Text>Input Width</Typography.Text>
            <Input
                value={selectedWidth}
                onChange={(event) => updateShapeProperty('width', event)}
                size="small"
                disabled={disabled}
            />
            {inputObj.type === 'LongTextInput' && (
                <>
                    <Typography.Text>Input Height</Typography.Text>
                    <Input
                        value={selectedHeight}
                        onChange={(event) => updateShapeProperty('height', event)}
                        size="small"
                        disabled={disabled}
                    />
                </>
            )}
        </div>
    );
};

export default TextInputSizer;