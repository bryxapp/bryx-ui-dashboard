import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { LongTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormLongTextFieldProps {
    longTextInputObj: LongTextInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
    sorting?: boolean;
}

const EstimateFormLongTextField = ({
    longTextInputObj,
    fieldValue,
    handleChange,
    sorting
}: EstimateFormLongTextFieldProps) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const handleInputNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'name', event.target.value, longTextInputObj.id);
    };
    //Calculate number of rows 
    const numRows = Math.round(longTextInputObj.height / (longTextInputObj.fontSize));
     
    return (
        <Form.Item
            key={longTextInputObj.id}
            label={sorting ? (
                <Input
                    value={longTextInputObj.name}
                    onChange={handleInputNameValueChange}
                />
            ) : (
                longTextInputObj.name
            )}
            style={{ marginBottom: '5px' }}
        >
            <Input.TextArea
                value={fieldValue}
                onChange={(event) => handleChange(event, longTextInputObj.id)}
                placeholder={longTextInputObj.textValue}
                rows={numRows}
                disabled={sorting}
            />
        </Form.Item>
    );
};

export default EstimateFormLongTextField;
