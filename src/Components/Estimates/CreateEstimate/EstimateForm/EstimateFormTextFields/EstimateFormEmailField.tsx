import React from 'react';
import { EmailInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormEmailFieldProps {
    emailInputObj: EmailInputObj;
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormEmailField = ({
    emailInputObj,
    fieldValues,
    setFieldValues,
}: EstimateFormEmailFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        const updatedFieldValues = {
            ...fieldValues,
            [emailInputObj.id]: value,
        };
        setFieldValues(updatedFieldValues);
    }

    return (
        <Form.Item
            key={emailInputObj.id}
            label={emailInputObj.label.value}
            rules={[{ type: 'email' }]}
            style={{ marginBottom: '5px' }}
        >
            <Input
                value={fieldValues[emailInputObj.id]}
                onChange={handleChange}
                placeholder={emailInputObj.content.value}
            />
        </Form.Item>
    );
};

export default EstimateFormEmailField;
