import React from 'react';
import { Form, Input, Typography, Checkbox } from 'antd';
import TextPropertiesMenu from './TextPropertiesMenu/TextPropertiesMenu';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty, updateShapeProperty } from '../../../../../../utils/shapeManagementUtils';
import { InputObj } from '../../../../../../utils/types/CanvasInterfaces';

interface LabelEditorProps {
    inputObj: InputObj;
}

const LabelEditor: React.FC<LabelEditorProps> = ({ inputObj }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleLabelValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'label', 'value', event.target.value, selectedId);
    };

    const handleHasLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'hasLabel', event.target.checked, selectedId);
    };

    const selectedInputLabel = inputObj.label.value ?? '';
    const hasLabel = inputObj?.hasLabel ?? false;

    return (
        <Form
            component="fieldset"
        >
            <Form.Item  label={<Typography.Text>Input Label</Typography.Text>}>
                <Input.Group>
                    <Typography.Text>Value</Typography.Text>
                    <Input
                        id={'labelValueEditor'}
                        value={selectedInputLabel}
                        onChange={handleLabelValueChange}
                        variant="outlined"
                        size='small'
                        disabled={!hasLabel}
                    />
                    <Checkbox
                        checked={hasLabel}
                        onChange={(e:any) => {handleHasLabelChange(e)}}
                    >
                        Has Label
                    </Checkbox>
                    <TextPropertiesMenu textObj={inputObj.label} itemType={'label'} />
                </Input.Group>
            </Form.Item>
        </Form>
    );
};

export default LabelEditor;
