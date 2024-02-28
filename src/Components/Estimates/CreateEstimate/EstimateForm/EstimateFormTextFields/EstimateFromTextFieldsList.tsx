import { FormInputs, ShapeObj, TextInputObj, TextTableObj } from '../../../../../utils/types/CanvasInterfaces'; // Adjusted import
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import EstimateFormTextField from './EstimateFormTextField';
import EstimateFormTextTable from './EstimateFormTextTable';

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
                if (formInput.type === "TextInput") {
                    const textInput = formInput as TextInputObj;
                    return (
                        <span key={formInput.id}>
                            <EstimateFormTextField textInputObj={textInput} fieldValues={fieldValues} setFieldValues={setFieldValues} />
                            <div style={{ height: 20 }}></div>
                        </span>
                    );
                } else if (formInput.type === "TextTable") {
                    const textTable = formInput as TextTableObj;
                    return (
                        <span key={textTable.id}>
                            <EstimateFormTextTable textTableObj={textTable} fieldValues={fieldValues} setFieldValues={setFieldValues} />
                            <div style={{ height: 20 }}></div>
                        </span>
                    );
                } else {
                    return null; // Handle other types or return null
                }
            })}
        </>
    );
};

export default EstimateFormTextFieldsList;
