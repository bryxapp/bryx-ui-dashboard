import React from 'react';
import { InputNumber, Typography } from 'antd';
import { InputObj, LongTextInputObj, ShapeObj, ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

interface TextInputSizerProps {
    inputObj: ShortTextInputObj | LongTextInputObj;
    disabled?: boolean;
}

const TextInputSizer: React.FC<TextInputSizerProps> = ({ inputObj, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const updateShapeProperty = (dimension: 'inputWidth' | 'inputHeight', number: number | null) => {
        //handle empty string // Parse float value for accuracy
        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (shape.id === selectedId) {
                const foundInputObj = shape as InputObj;
                const updatedInputObj = { ...foundInputObj, [dimension]: number };
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
                    <InputNumber
                        value={selectedWidth}
                        onChange={(event) => updateShapeProperty('inputWidth', event)}
                        size="small"
                        style={{ width: '4em' }}
                        disabled={disabled}
                        min={1}
                    />
                </div>
                {inputObj.type === 'LongTextInput' && (
                    <>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-start" }}>
                            <Typography.Text style={{ marginRight: '.2em' }}>h:</Typography.Text>
                            <InputNumber
                                value={selectedHeight}
                                onChange={(event) => updateShapeProperty('inputHeight', event)}
                                size="small"
                                style={{ width: '4em' }}
                                disabled={disabled}
                                min={1}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default TextInputSizer;
