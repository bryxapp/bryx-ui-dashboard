import { PhoneInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormPhoneFieldProps {
    phoneInputObj: PhoneInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
    disabled?: boolean;
}

const EstimateFormPhoneField = ({
    phoneInputObj,
    fieldValue,
    handleChange,
    disabled
}: EstimateFormPhoneFieldProps) => {

    return (
        <Form.Item
            key={phoneInputObj.id}
            label={phoneInputObj.hasLabel ? phoneInputObj.label.value : null}
            rules={[{ pattern: /^(\(\d{3}\) \d{3}-\d{4})$/, message: 'Please enter a valid phone number' }]}
            style={{ marginBottom: '5px' }}
        >
            <Input
                value={fieldValue}
                onChange={(event) => handleChange(event, phoneInputObj.id)}
                placeholder={phoneInputObj.content.value}
                disabled={disabled}
            />
        </Form.Item>
    );
};

export default EstimateFormPhoneField;
