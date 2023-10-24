import { TextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import EstimateFormTextField from './EstimateFormTextField';

interface EstimateFormTextFieldsListProps {
    textInputShapeObjs: TextInputObj[];
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormTextFieldsList = ({
    textInputShapeObjs,
    fieldValues,
    setFieldValues,
}: EstimateFormTextFieldsListProps) => {
    return (
        <>
            {textInputShapeObjs.map((inputObj: TextInputObj) => (
                <span key={inputObj.id}>
                    <EstimateFormTextField textInputObj={inputObj} fieldValues={fieldValues} setFieldValues={setFieldValues} />
                    <div style={{ height: 20 }}></div>
                </span>
            ))}
        </>
    );
};

export default EstimateFormTextFieldsList;
