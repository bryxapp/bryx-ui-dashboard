import { isInputObject } from '../../../../../utils/shapeManagementUtils';
import { FormInputs, InputObj, ShapeObj} from '../../../../../utils/types/CanvasInterfaces'; // Adjusted import
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import EstimateFormTextField from './EstimateFormTextField';

interface EstimateFormTextFieldsListProps {
    formInputs: FormInputs;
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormTextFieldsList: React.FC<EstimateFormTextFieldsListProps> = ({
    formInputs,
    fieldValues,
    setFieldValues,
}) => {
    return (
        <>
            {formInputs.map((formInput: ShapeObj) => {
                if (isInputObject(formInput)) {
                    const inputObj = formInput as InputObj;
                    return (
                        <span key={formInput.id}>
                            <EstimateFormTextField inputObj={inputObj} fieldValues={fieldValues} setFieldValues={setFieldValues} />
                            <div style={{ height: 20 }}></div>
                        </span>
                    );
                } 
                else {
                    return null; // Handle other types or return null
                }
            })}
        </>
    );
};

export default EstimateFormTextFieldsList;
