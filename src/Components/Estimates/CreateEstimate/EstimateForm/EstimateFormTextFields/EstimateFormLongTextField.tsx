import React from 'react';
import { LongTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormLongTextFieldProps {
    longTextInputObj: LongTextInputObj;
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormLongTextField = ({
    longTextInputObj,
    fieldValues,
    setFieldValues,
}: EstimateFormLongTextFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let { value } = event.target;
        const updatedFieldValues = {
            ...fieldValues,
            [longTextInputObj.id]: value,
        };
        setFieldValues(updatedFieldValues);
    };

    return (
        <Form.Item
            key={longTextInputObj.id}
            label={longTextInputObj.label.value}
            style={{ marginBottom: '5px' }}
        >
            <Input.TextArea
                value={fieldValues[longTextInputObj.id]}
                onChange={handleChange}
                placeholder={longTextInputObj.content.value}
            />
        </Form.Item>
    );
};

export default EstimateFormLongTextField;
