import { Card, Input, Typography } from 'antd';
import { DateInputObj, InputObj, TextObj } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from '../TextProperties/TextProperties';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty } from '../../../../../utils/shapeManagementUtils';
import DateInputContentProperties from './DateInputContentProperties';

interface InputContentPropertiesProps {
    inputObj: InputObj;
}

const InputContentProperties = ({ inputObj }: InputContentPropertiesProps) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleContentValueChange = (event: any) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.value, selectedId);
    };

    const selectedInputContent = inputObj.content.value ?? '';

    if (inputObj.type === "DateInput") return (<DateInputContentProperties dateInputObj={inputObj as DateInputObj} />);

    return (
        <Card>
            <Typography.Text>Place Holder</Typography.Text>
            {inputObj.type === "LongTextInput" &&
                <Input.TextArea
                    id={'contentValueEditor'}
                    value={selectedInputContent}
                    onChange={handleContentValueChange}
                    size='small'
                    placeholder='Optional'
                />}
            {inputObj.type !== "LongTextInput" &&
                <Input
                    id={'contentValueEditor'}
                    value={selectedInputContent}
                    onChange={handleContentValueChange}
                    size='small'
                    placeholder='Optional'
                />}
            <div style={{ height: '10px' }} />
            <TextProperties textObj={inputObj.content as TextObj} itemType={'content'} />
        </Card>
    );
};

export default InputContentProperties;

