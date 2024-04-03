import React from 'react';
import { Form, Input, Typography } from 'antd';
import TextPropertiesMenu from './TextPropertiesMenu/TextPropertiesMenu';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty } from '../../../../../utils/shapeManagementUtils';
import { InputObj } from '../../../../../utils/types/CanvasInterfaces';

interface ContentEditorProps {
    inputObj: InputObj;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ inputObj }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleLabelValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.value, selectedId);
    };

    const selectedInputContent = inputObj.content.value ?? '';

    return (
        <Form
            component="fieldset"
            style={{ paddingLeft: '1rem' }}
        >
            <Form.Item
                label={<Typography.Text>Input Content</Typography.Text>}
            >
                <Input.Group>
                    <Typography.Text>Place Holder</Typography.Text>
                    <Input
                        id={'contentValueEditor'}
                        value={selectedInputContent}
                        onChange={handleLabelValueChange}
                        size='small'
                    />
                    <TextPropertiesMenu textObj={inputObj.content} itemType={'content'} />
                </Input.Group>
            </Form.Item>
        </Form>
    );
};

export default ContentEditor;