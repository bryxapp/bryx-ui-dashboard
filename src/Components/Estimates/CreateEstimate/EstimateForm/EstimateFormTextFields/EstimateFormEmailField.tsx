import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { EmailInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Form, Input } from 'antd';

interface EstimateFormEmailFieldProps {
    emailInputObj: EmailInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
    sorting: boolean;
}

const EstimateFormEmailField = ({
    emailInputObj,
    fieldValue,
    handleChange,
    sorting
}: EstimateFormEmailFieldProps) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const handleInputNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'name', event.target.value, emailInputObj.id);
    };
     
    return (
        <Form.Item
            key={emailInputObj.id}
            label={sorting ? (
                <Input
                    value={emailInputObj.name}
                    onChange={handleInputNameValueChange}
                />
            ) : (
                emailInputObj.name
            )}
            style={{ marginBottom: '5px' }}
        >
            <Input
                value={fieldValue}
                onChange={(event) => handleChange(event, emailInputObj.id)}
                placeholder={emailInputObj.textValue}
                disabled={sorting}
            />
        </Form.Item>
    );
};

export default EstimateFormEmailField;
