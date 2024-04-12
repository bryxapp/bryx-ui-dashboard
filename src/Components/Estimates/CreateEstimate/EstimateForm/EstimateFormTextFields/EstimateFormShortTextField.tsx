import React from 'react';
import { ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormShortTextFieldProps {
    shortTextInputObj: ShortTextInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
}

const EstimateFormShortTextField: React.FC<EstimateFormShortTextFieldProps> = ({
    shortTextInputObj,
    fieldValue,
    handleChange
}) => {

    return (
        <Form.Item
            key={shortTextInputObj.id}
            label={shortTextInputObj.hasLabel ? shortTextInputObj.label.value : null}
            style={{ marginBottom: '5px' }}
        >
            <Input
                value={fieldValue}
                onChange={(event) => handleChange(event, shortTextInputObj.id)}
                placeholder={shortTextInputObj.content.value}
            />
        </Form.Item>
    );
};

export default EstimateFormShortTextField;
