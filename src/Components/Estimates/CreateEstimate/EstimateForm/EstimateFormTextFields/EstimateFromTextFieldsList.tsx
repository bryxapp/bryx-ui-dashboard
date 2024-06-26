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
import EstimateName from '../EstimateName/EstimateName';

interface EstimateFormTextFieldsListProps {
    formInputs: EstimateFormFields;
    setFormInputs: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
    templateFriendlyName: string;
    templateId: string;
    editing: boolean;
    setEditing: any;
    estimateName: string;
    setEstimateName: any;
}

const EstimateFormTextFieldsList: React.FC<EstimateFormTextFieldsListProps> = ({
    formInputs,
    setFormInputs,
    templateFriendlyName,
    templateId,
    editing,
    setEditing,
    estimateName,
    setEstimateName,
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
                return (<EstimateFormTextField shortTextInputObj={inputObj as ShortTextInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} key={"parent" + inputObj.id} sorting={false} />);
            case "EmailInput":
                return (<EstimateFormEmailField emailInputObj={inputObj as EmailInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} key={"parent" + inputObj.id} sorting={false} />);
            case "LongTextInput":
                return (<EstimateFormLongTextField longTextInputObj={inputObj as LongTextInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} key={"parent" + inputObj.id} sorting={false} />);
            case "PhoneInput":
                return (<EstimateFormPhoneField phoneInputObj={inputObj as PhoneInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} key={"parent" + inputObj.id} sorting={false} />);
            case "DateInput":
                return (<EstimateFormDateField dateInputObj={inputObj as DateInputObj} setFormInputs={setFormInputs} formInputs={formInputs} fieldValue={fieldValue} key={"parent" + inputObj.id} sorting={false} />)
            default:
                return null;
        }
    }

    if (!canvasDesign) return null;
    if (!formInputs) return null;
    return (
        <>
            <EstimateName
                estimateName={estimateName}
                setEstimateName={setEstimateName}
                editing={editing}
                setEditing={setEditing}
                templateFriendlyName={templateFriendlyName}
                templateId={templateId}
            />
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
