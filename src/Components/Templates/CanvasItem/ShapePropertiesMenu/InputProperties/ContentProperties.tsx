import { Card, Input, Typography } from 'antd';
import { DateInputObj, InputObj, LongTextInputObj, TextObj } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from '../TextProperties/TextProperties';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty } from '../../../../../utils/shapeManagementUtils';
import DateInputContentProperties from './DateInputContentProperties';
import TextInputSizer from './TextInputSizer';

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

    let verticalAlign = '';
    if(inputObj.type==="LongTextInput"){
        const longInputObj = inputObj as LongTextInputObj;
        verticalAlign = longInputObj.verticalAlign;
    }

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
                <div style={{ height: '.5rem' }} />
            {(inputObj.type === "ShortTextInput" || inputObj.type === "LongTextInput") && (
                <>
                <TextInputSizer inputObj={inputObj} />
                <div style={{ height: '.5rem' }} />
                </>
            )}
            <TextProperties textObj={inputObj.content as TextObj} itemType={'content'} verticalAlign={verticalAlign} />
        </Card>
    );
};

export default InputContentProperties;

