import React from 'react';
import { ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormShortTextFieldProps {
    shortTextInputObj: ShortTextInputObj;
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormShortTextField = ({
    shortTextInputObj,
    fieldValues,
    setFieldValues,
}: EstimateFormShortTextFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        const updatedFieldValues = {
            ...fieldValues,
            [shortTextInputObj.id]: value,
        };
        setFieldValues(updatedFieldValues);
    };

    return (
        <Form.Item
            key={shortTextInputObj.id}
            label={shortTextInputObj.label.value}
            style={{ marginBottom: '5px' }}
        >
            <Input
                value={fieldValues[shortTextInputObj.id]}
                onChange={handleChange}
                placeholder={shortTextInputObj.content.value}
            />
        </Form.Item>
    );
};

export default EstimateFormShortTextField;
