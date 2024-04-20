import { EmailInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormEmailFieldProps {
    emailInputObj: EmailInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
    disabled?: boolean;
}

const EstimateFormEmailField = ({
    emailInputObj,
    fieldValue,
    handleChange,
    disabled
}: EstimateFormEmailFieldProps) => {
    return (
        <Form.Item
            key={emailInputObj.id}
            label={emailInputObj.hasLabel ? emailInputObj.label.value : null}
            rules={[{ type: 'email' }]}
            style={{ marginBottom: '5px' }}
        >
            <Input
                value={fieldValue}
                onChange={(event) => handleChange(event, emailInputObj.id)}
                placeholder={emailInputObj.content.placeHolder}
                disabled={disabled}
            />
        </Form.Item>
    );
};

export default EstimateFormEmailField;
