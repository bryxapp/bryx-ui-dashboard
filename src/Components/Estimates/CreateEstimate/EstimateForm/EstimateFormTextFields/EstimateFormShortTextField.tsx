import React from 'react';
import { ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormShortTextFieldProps {
    shortTextInputObj: ShortTextInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
    disabled?: boolean;
}

const EstimateFormShortTextField: React.FC<EstimateFormShortTextFieldProps> = ({
    shortTextInputObj,
    fieldValue,
    handleChange,
    disabled
}) => {

    return (
        <Form.Item
            key={shortTextInputObj.id}
            label={shortTextInputObj.name}
            style={{ marginBottom: '5px' }}
        >
            <Input
                value={fieldValue}
                onChange={(event) => handleChange(event, shortTextInputObj.id)}
                placeholder={shortTextInputObj.value}
                disabled={disabled}
            />
        </Form.Item>
    );
};

export default EstimateFormShortTextField;
