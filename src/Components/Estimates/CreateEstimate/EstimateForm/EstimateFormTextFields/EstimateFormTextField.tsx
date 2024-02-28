import React from 'react';
import { TextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import {StyledTextField as TextField} from '../../../../SharedComponents/TextField/TextField'
import { formatDate, getInputProps } from '../../../../../utils/form-utils';

interface EstimateFormTextFieldProps {
    textInputObj: TextInputObj;
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormTextField = ({
    textInputObj,
    fieldValues,
    setFieldValues,
}: EstimateFormTextFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        if (textInputObj.format === 'date') {
            value = formatDate(value);
        }
        const updatedFieldValues = {
            ...fieldValues,
            [textInputObj.id]: value,
          };
        setFieldValues(updatedFieldValues);
    };

    const inputProps = getInputProps(textInputObj.format);

    return (
        <TextField
            key={textInputObj.id}
            label={textInputObj.displayName}
            name={textInputObj.displayName}
            value={fieldValues[textInputObj.id]}
            onChange={handleChange}
            InputProps={inputProps}
            InputLabelProps={{ style: { fontSize: 20 } }} // Set the font size of the label text}
        />
    );
};

export default EstimateFormTextField;
