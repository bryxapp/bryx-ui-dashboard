import { Card, Input, Typography } from 'antd';
import { InputObj, TextObj } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from '../TextProperties/TextProperties';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty } from '../../../../../utils/shapeManagementUtils';

interface InputContentPropertiesProps {
    inputObj: InputObj;
}

const InputContentProperties = ({ inputObj }: InputContentPropertiesProps) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleContentValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.value, selectedId);
    };

    const selectedInputContent = inputObj.content.value ?? '';

    return (
        <Card>
            <Typography.Text>Place Holder</Typography.Text>
            <Input
                id={'contentValueEditor'}
                value={selectedInputContent}
                onChange={handleContentValueChange}
                size='small'
            />
            <div style={{ height: '10px' }} />
            <TextProperties textObj={inputObj.content as TextObj} itemType={'content'}/>
        </Card>
    );
};

export default InputContentProperties;

