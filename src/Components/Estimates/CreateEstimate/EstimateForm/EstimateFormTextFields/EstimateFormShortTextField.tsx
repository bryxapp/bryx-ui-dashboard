import React from 'react';
import { ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { Form, Input } from 'antd';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

interface EstimateFormShortTextFieldProps {
    shortTextInputObj: ShortTextInputObj;
    fieldValue: string;
    handleChange: (event: any, inputObjId: string) => void;
    sorting?: boolean;
}

const EstimateFormShortTextField: React.FC<EstimateFormShortTextFieldProps> = ({
    shortTextInputObj,
    fieldValue,
    handleChange,
    sorting
}) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const handleInputNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'name', event.target.value, shortTextInputObj.id);
    };

    return (
        <Form.Item
            key={shortTextInputObj.id}
            label={sorting ? (
                <Input
                    value={shortTextInputObj.name}
                    onChange={handleInputNameValueChange}
                />
            ) : (
                shortTextInputObj.name
            )}
            style={{ marginBottom: '5px' }}
        >
            <Input
                value={fieldValue}
                onChange={(event) => handleChange(event, shortTextInputObj.id)}
                placeholder={shortTextInputObj.value}
                disabled={sorting}
            />
        </Form.Item>
    );
};

export default EstimateFormShortTextField;
