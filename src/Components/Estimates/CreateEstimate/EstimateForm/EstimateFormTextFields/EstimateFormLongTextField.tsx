import { LongTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormLongTextFieldProps {
    longTextInputObj: LongTextInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
}

const EstimateFormLongTextField = ({
    longTextInputObj,
    fieldValue,
    handleChange
}: EstimateFormLongTextFieldProps) => {

    return (
        <Form.Item
            key={longTextInputObj.id}
            label={longTextInputObj.hasLabel ? longTextInputObj.label.value : null}
            style={{ marginBottom: '5px' }}
        >
            <Input.TextArea
                value={fieldValue}
                onChange={(event) => handleChange(event, longTextInputObj.id)}
                placeholder={longTextInputObj.content.value}
            />
        </Form.Item>
    );
};

export default EstimateFormLongTextField;
