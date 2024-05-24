import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { PhoneInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormPhoneFieldProps {
    phoneInputObj: PhoneInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
    sorting: boolean;
}

const EstimateFormPhoneField = ({
    phoneInputObj,
    fieldValue,
    handleChange,
    sorting
}: EstimateFormPhoneFieldProps) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const handleInputNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'name', event.target.value, phoneInputObj.id);
    };

    return (
        <Form.Item
            key={phoneInputObj.id}
            label={sorting ? (
                <Input
                    value={phoneInputObj.name}
                    onChange={handleInputNameValueChange}
                />
            ) : (
                phoneInputObj.name
            )}
            style={{ marginBottom: '5px' }}
        >
            <Input
                value={fieldValue}
                onChange={(event) => handleChange(event, phoneInputObj.id)}
                placeholder={phoneInputObj.value}
                disabled={sorting}
            />
        </Form.Item>
    );
};

export default EstimateFormPhoneField;
