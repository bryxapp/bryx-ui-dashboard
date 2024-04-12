import { DateInputObj, EmailInputObj, InputObj, LongTextInputObj, PhoneInputObj, ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces'; // Adjusted import
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import EstimateFormDateField from './EstimateFormDateField';
import EstimateFormEmailField from './EstimateFormEmailField';
import EstimateFormLongTextField from './EstimateFormLongTextField';
import EstimateFormPhoneField from './EstimateFormPhoneField';
import EstimateFormTextField from './EstimateFormShortTextField';

interface EstimateFormTextFieldsListProps {
    inputObjects: InputObj[];
    formInputs: EstimateFormFields;
    setFormInputs: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormTextFieldsList: React.FC<EstimateFormTextFieldsListProps> = ({
    inputObjects,
    formInputs,
    setFormInputs
}) => {

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

    return (
        <>
            {inputObjects.map((inputObj: InputObj) => {
                const fieldValue = formInputs[inputObj.id].value;
                switch (inputObj.type) {
                    case "ShortTextInput":
                        return (<EstimateFormTextField shortTextInputObj={inputObj as ShortTextInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} />);
                    case "EmailInput":
                        return (<EstimateFormEmailField emailInputObj={inputObj as EmailInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} />);
                    case "LongTextInput":
                        return (<EstimateFormLongTextField longTextInputObj={inputObj as LongTextInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} />);
                    case "PhoneInput":
                        return (<EstimateFormPhoneField phoneInputObj={inputObj as PhoneInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} />);
                    case "DateInput":
                        return (<EstimateFormDateField dateInputObj={inputObj as DateInputObj} handleChange={handleFieldChange} fieldValue={fieldValue} />)
                    default:
                        return null;
                }
            })}
        </>
    );
};

export default EstimateFormTextFieldsList;
