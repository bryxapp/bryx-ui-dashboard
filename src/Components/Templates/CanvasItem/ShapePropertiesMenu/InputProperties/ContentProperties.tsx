import React from 'react';
import { Card, Input, Typography } from 'antd';
import { DateInputObj, InputObj, LongTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from '../TextProperties/TextProperties';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import DateInputContentProperties from './DateInputContentProperties';
import TextAlignmentPicker from '../TextProperties/TextAlignmentPicker';
import TextVerticalAlignmentPicker from '../TextProperties/TextVerticalAlignmentPicker';

interface InputContentPropertiesProps {
    inputObj: InputObj;
}

const InputContentProperties: React.FC<InputContentPropertiesProps> = ({ inputObj }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const selectedInputContent = inputObj.textValue ?? '';
    const isLongTextInput = inputObj.type === 'LongTextInput';

    const handleContentValueChange = (event: React.ChangeEvent<any>) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'textValue', event.target.value, selectedId);
    };

    const handleNameValueChange = (event: React.ChangeEvent<any>) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'name', event.target.value, selectedId);
    };

    let verticalAlign = '';
    if (isLongTextInput) {
        verticalAlign = (inputObj as LongTextInputObj).verticalAlign;
    }

    return (
        <Card>
            <Typography.Text>Name</Typography.Text>
            <Input
                id="inputNameEditor"
                value={inputObj.name}
                onChange={handleNameValueChange}
                size="small"
                placeholder='Name your input field'
            />
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
                </>
            )}

            <TextProperties textObj={inputObj} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TextAlignmentPicker horizontalAlign={inputObj.horizontalAlign} />
                {verticalAlign &&
                    (
                        <>
                            <div style={{ width: '1rem' }} />
                            <TextVerticalAlignmentPicker verticalAlign={verticalAlign} />
                        </>
                    )}
            </div>
        </Card>
    );
};

export default InputContentProperties;
