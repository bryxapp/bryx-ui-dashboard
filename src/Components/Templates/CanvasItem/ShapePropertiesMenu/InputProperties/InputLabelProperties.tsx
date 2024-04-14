import { Card, Checkbox } from 'antd';
import { InputObj, TextObj } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from '../TextProperties/TextProperties';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface InputLabelPropertiesProps {
    inputObj: InputObj;
}

const InputLabelProperties = ({ inputObj }: InputLabelPropertiesProps) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleHasLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'hasLabel', event.target.checked, selectedId);
    };

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
            <TextProperties textObj={inputObj.label as TextObj} itemType={'label'} disabled={!hasLabel} />
        </Card>
    );
};

export default InputLabelProperties;

