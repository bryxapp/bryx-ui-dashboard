import { DateInputObj, EmailInputObj, InputObj, LongTextInputObj, PhoneInputObj, ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces'; // Adjusted import
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import EstimateFormDateField from './EstimateFormDateField';
import EstimateFormEmailField from './EstimateFormEmailField';
import EstimateFormLongTextField from './EstimateFormLongTextField';
import EstimateFormPhoneField from './EstimateFormPhoneField';
import EstimateFormTextField from './EstimateFormShortTextField';

interface EstimateFormTextFieldsListProps {
    formInputs: InputObj[];
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormTextFieldsList: React.FC<EstimateFormTextFieldsListProps> = ({
    formInputs,
    fieldValues,
    setFieldValues,
}) => {
    console.log("formInputs", formInputs)
    return (
        <>
            {formInputs.map((formInput: InputObj) => {
                console.log("inputObj", formInput);
                switch (formInput.type) {
                    case "ShortTextInput":
                        return (<EstimateFormTextField shortTextInputObj={formInput as ShortTextInputObj} fieldValues={fieldValues} setFieldValues={setFieldValues} />);
                    case "EmailInput":
                        return (<EstimateFormEmailField emailInputObj={formInput as EmailInputObj} fieldValues={fieldValues} setFieldValues={setFieldValues} />);
                    case "LongTextInput":
                        return (<EstimateFormLongTextField longTextInputObj={formInput as LongTextInputObj} fieldValues={fieldValues} setFieldValues={setFieldValues} />);
                    case "PhoneInput":
                        return (<EstimateFormPhoneField phoneInputObj={formInput as PhoneInputObj} fieldValues={fieldValues} setFieldValues={setFieldValues} />);
                    case "DateInput":
                        return (<EstimateFormDateField dateInputObj={formInput as DateInputObj} fieldValues={fieldValues} setFieldValues={setFieldValues} />)
                    default:
                        return null;
                }
            })}
        </>
    );
};

export default EstimateFormTextFieldsList;
