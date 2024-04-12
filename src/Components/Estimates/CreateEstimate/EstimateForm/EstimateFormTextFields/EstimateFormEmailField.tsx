import { EmailInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormEmailFieldProps {
    emailInputObj: EmailInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
}

const EstimateFormEmailField = ({
    emailInputObj,
    fieldValue,
    handleChange
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
                placeholder={emailInputObj.content.value}
            />
        </Form.Item>
    );
};

export default EstimateFormEmailField;
