import { LongTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormLongTextFieldProps {
    longTextInputObj: LongTextInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
    disabled?: boolean;
}

const EstimateFormLongTextField = ({
    longTextInputObj,
    fieldValue,
    handleChange,
    disabled
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
                placeholder={longTextInputObj.content.placeHolder}
                disabled={disabled}
            />
        </Form.Item>
    );
};

export default EstimateFormLongTextField;
