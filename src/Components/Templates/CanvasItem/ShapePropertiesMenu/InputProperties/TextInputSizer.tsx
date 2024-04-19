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
        <>
            <Typography.Text>Size</Typography.Text>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-start" }}>
                    <Typography.Text style={{ marginRight: '.2em' }}>w:</Typography.Text>
                    <Input
                        value={selectedWidth}
                        onChange={(event) => updateShapeProperty('width', event)}
                        size="small"
                        style={{ width: '4em' }}
                        disabled={disabled}
                    />
                </div>
                {inputObj.type === 'LongTextInput' && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-start" }}>
                            <Typography.Text style={{ marginRight: '.2em' }}>h:</Typography.Text>
                            <Input
                                value={selectedHeight}
                                onChange={(event) => updateShapeProperty('height', event)}
                                size="small"
                                style={{ width: '4em' }}
                                disabled={disabled}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default TextInputSizer;
