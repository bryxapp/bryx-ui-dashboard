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
    //Calculate number of rows 
    const numRows = Math.round(longTextInputObj.height / (longTextInputObj.fontSize));

    return (
        <Form.Item
            key={longTextInputObj.id}
            label={longTextInputObj.name}
            style={{ marginBottom: '5px' }}
        >
            <Input.TextArea
                value={fieldValue}
                onChange={(event) => handleChange(event, longTextInputObj.id)}
                placeholder={longTextInputObj.value}
                rows={numRows}
                disabled={disabled}
            />
        </Form.Item>
    );
};

export default EstimateFormLongTextField;
