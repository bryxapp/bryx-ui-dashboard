import React from 'react';
import { PhoneInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormPhoneFieldProps {
    phoneInputObj: PhoneInputObj;
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormPhoneField = ({
    phoneInputObj,
    fieldValues,
    setFieldValues,
}: EstimateFormPhoneFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        const updatedFieldValues = {
            ...fieldValues,
            [phoneInputObj.id]: value,
        };
        setFieldValues(updatedFieldValues);
    }

    return (
        <Form.Item
            key={phoneInputObj.id}
            label={phoneInputObj.label.value}
            rules={[{ pattern: /^(\(\d{3}\) \d{3}-\d{4})$/, message: 'Please enter a valid phone number' }]}
            style={{ marginBottom: '5px' }}
        >
            <Input
                value={fieldValues[phoneInputObj.id]}
                onChange={handleChange}
                placeholder={phoneInputObj.content.value}
            />
        </Form.Item>
    );
};

export default EstimateFormPhoneField;
