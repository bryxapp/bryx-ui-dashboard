import React from 'react';
import { Card, Divider, Input, Typography } from 'antd';
import { DateInputObj, InputObj, LongTextInputObj, TextObj } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from '../TextProperties/TextProperties';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty } from '../../../../../utils/shapeManagementUtils';
import DateInputContentProperties from './DateInputContentProperties';
import TextInputSizer from './TextInputSizer';

interface InputContentPropertiesProps {
    inputObj: InputObj;
}

const InputContentProperties: React.FC<InputContentPropertiesProps> = ({ inputObj }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const selectedInputContent = inputObj.content.value ?? '';
    const isLongTextInput = inputObj.type === 'LongTextInput';

    const handleContentValueChange = (event: React.ChangeEvent<any>) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.value, selectedId);
    };

    let verticalAlign = '';
    if (isLongTextInput) {
        verticalAlign = (inputObj as LongTextInputObj).verticalAlign;
    }

    return (
        <Card>
            <Typography.Text>Place Holder</Typography.Text>
            {inputObj.type === "DateInput" ? (
                <DateInputContentProperties dateInputObj={inputObj as DateInputObj} />
            ) : (
                <>
                    {isLongTextInput ? (
                        <Input.TextArea
                            id="contentValueEditor"
                            value={selectedInputContent}
                            onChange={handleContentValueChange}
                            size="small"
                            placeholder="Optional"
                        />
                    ) : (
                        <Input
                            id="contentValueEditor"
                            value={selectedInputContent}
                            onChange={handleContentValueChange}
                            size="small"
                            placeholder="Optional"
                        />
                    )}
                    <Divider style={{ margin: ".5rem" }} />
                    {(inputObj.type === "ShortTextInput" || isLongTextInput) && (
                        <>
                            <TextInputSizer inputObj={inputObj} />
                            <div style={{ height: '.5rem' }} />
                        </>
                    )}
                </>
            )}
            <TextProperties textObj={inputObj.content as TextObj} itemType="content" verticalAlign={verticalAlign} />
        </Card>
    );
};

export default InputContentProperties;
