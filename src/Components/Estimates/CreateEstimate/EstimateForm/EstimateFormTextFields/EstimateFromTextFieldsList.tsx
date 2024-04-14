import React from 'react';
import { DateInputObj, EmailInputObj, InputObj, LongTextInputObj, PhoneInputObj, ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces'; // Adjusted import
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import EstimateFormDateField from './EstimateFormDateField';
import EstimateFormEmailField from './EstimateFormEmailField';
import EstimateFormLongTextField from './EstimateFormLongTextField';
import EstimateFormPhoneField from './EstimateFormPhoneField';
import EstimateFormTextField from './EstimateFormShortTextField';
import { findShape } from '../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

interface EstimateFormTextFieldsListProps {
    formInputs: EstimateFormFields;
    setFormInputs: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormTextFieldsList: React.FC<EstimateFormTextFieldsListProps> = ({
    formInputs,
    setFormInputs,
}) => {
    const {canvasDesign} = useCanvasDesignContext();
    const handleFieldChange = (event: any, inputObjId: string) => {
        let { value } = event.target;
        const updatedFormInputs = {
            ...formInputs,
            [inputObjId]: {
                ...formInputs[inputObjId],
                value: value,
            },
        };
        setFormInputs(updatedFormInputs);
    };

    if (!canvasDesign) return null;
    if (!formInputs) return null;
    return (
        <>
            {canvasDesign.inputOrder.map((inputObjId: string) => {
                const inputObj = findShape(canvasDesign, inputObjId) as InputObj;
                const fieldValue = formInputs[inputObj.id].value;
                switch (inputObj.type) {
                    case "ShortTextInput":
                        return (<EstimateFormTextField shortTextInputObj={inputObj as ShortTextInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} key={"parent" + inputObj.id} />);
                    case "EmailInput":
                        return (<EstimateFormEmailField emailInputObj={inputObj as EmailInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} key={"parent" + inputObj.id} />);
                    case "LongTextInput":
                        return (<EstimateFormLongTextField longTextInputObj={inputObj as LongTextInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} key={"parent" + inputObj.id} />);
                    case "PhoneInput":
                        return (<EstimateFormPhoneField phoneInputObj={inputObj as PhoneInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} key={"parent" + inputObj.id} />);
                    case "DateInput":
                        return (<EstimateFormDateField dateInputObj={inputObj as DateInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} key={"parent" + inputObj.id} />)
                    default:
                        return null;
                }
            })}
        </>
    );
};

export default EstimateFormTextFieldsList;
