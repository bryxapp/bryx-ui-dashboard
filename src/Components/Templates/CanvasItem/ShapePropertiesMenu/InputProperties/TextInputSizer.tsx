import React from 'react';
import { Input, Typography } from 'antd';
import { InputObj, LongTextInputObj, ShapeObj, ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

interface TextInputSizerProps {
    inputObj: ShortTextInputObj | LongTextInputObj;
    disabled?: boolean;
}

const TextInputSizer: React.FC<TextInputSizerProps> = ({ inputObj, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const updateShapeProperty = (dimension: 'width' | 'height', event: React.ChangeEvent<HTMLInputElement>) => {
        //handle empty string
        const value = Math.round(parseFloat(event.target.value)); // Parse float value for accuracy
        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (shape.id === selectedId) {
                const foundInputObj = shape as InputObj;
                const updatedInputObj = {
                    ...foundInputObj,
                    inputContentShape: { ...foundInputObj.content, [dimension]: value },
                };
                return updatedInputObj;
            }
            return shape;
        });
        setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
    };
    let selectedWidth = 0;
    let selectedHeight = 0;
    if (inputObj.type === 'ShortTextInput') {
        const shortTextInput = inputObj as ShortTextInputObj;
        selectedWidth = shortTextInput.inputWidth ? Math.round(shortTextInput.inputWidth) : 0;
    }
    else if (inputObj.type === 'LongTextInput') {
        const longTextInput = inputObj as LongTextInputObj;
        selectedWidth = longTextInput.inputWidth ? Math.round(longTextInput.inputWidth) : 0;
        selectedHeight = longTextInput.inputHeight ? Math.round(longTextInput.inputHeight) : 0;
    }

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
