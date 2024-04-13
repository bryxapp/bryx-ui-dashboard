import { Card, Checkbox, Input, Typography } from 'antd';
import { InputObj, TextObj } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from '../TextProperties/TextProperties';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface InputLabelPropertiesProps {
    inputObj: InputObj;
}

const InputLabelProperties = ({ inputObj }: InputLabelPropertiesProps) => {
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
        <Card>
            <Checkbox
                checked={hasLabel}
                onChange={(e: any) => { handleHasLabelChange(e) }}
            >
                Has Label
            </Checkbox>
            <div style={{ height: '10px' }} />
            <Typography.Text>Label Value</Typography.Text>
            <Input
                id={'labelValueEditor'}
                value={selectedInputLabel}
                onChange={handleLabelValueChange}
                variant="outlined"
                size='small'
                disabled={!hasLabel}
            />
            <div style={{ height: '10px' }} />
            <TextProperties textObj={inputObj.label as TextObj} itemType={'label'} disabled={!hasLabel} />
        </Card>
    );
};

export default InputLabelProperties;

