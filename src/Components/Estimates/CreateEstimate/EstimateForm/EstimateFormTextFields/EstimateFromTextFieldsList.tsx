import React from 'react';
import { DateInputObj, EmailInputObj, InputObj, LongTextInputObj, PhoneInputObj, ShortTextInputObj, TableInputObj } from '../../../../../utils/types/CanvasInterfaces'; // Adjusted import
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import EstimateFormDateField from './EstimateFormDateField';
import EstimateFormEmailField from './EstimateFormEmailField';
import EstimateFormLongTextField from './EstimateFormLongTextField';
import EstimateFormPhoneField from './EstimateFormPhoneField';
import EstimateFormTextField from './EstimateFormShortTextField';
import { findShape, isInputObject, isTableObject } from '../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import EstimateFormTable from './EstimateFormTable';

interface EstimateFormTextFieldsListProps {
    formInputs: EstimateFormFields;
    setFormInputs: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormTextFieldsList: React.FC<EstimateFormTextFieldsListProps> = ({
    formInputs,
    setFormInputs,
}) => {
    const { canvasDesign } = useCanvasDesignContext();
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

    const getInputFormField = (inputObj: InputObj, formInputs: EstimateFormFields) => {
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
                return (<EstimateFormDateField dateInputObj={inputObj as DateInputObj} setFormInputs={setFormInputs} formInputs={formInputs} fieldValue={fieldValue} key={"parent" + inputObj.id} />)
            default:
                return null;
        }
    }

    if (!canvasDesign) return null;
    if (!formInputs) return null;
    return (
        <>
            {canvasDesign.inputOrder.map((inputObjId: string) => {
                const shapeObj = findShape(canvasDesign, inputObjId);
                if (!shapeObj) return null;
                if (isTableObject(shapeObj)) return <EstimateFormTable tableInputObj={shapeObj as TableInputObj} formInputs={formInputs} handleChange={handleFieldChange} key={"parent" + shapeObj.id} />;
                if (isInputObject(shapeObj)) return getInputFormField(shapeObj as InputObj, formInputs);
                return null;
            })}
        </>
    );
};

export default EstimateFormTextFieldsList;
