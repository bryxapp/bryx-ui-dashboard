import React from 'react';
import { InputObj } from '../../../../../utils/types/CanvasInterfaces';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import { StyledTextField as TextField } from '../../../../SharedComponents/TextField/TextField'
import { getInputProps } from '../../../../../utils/form-utils';

interface EstimateFormTextFieldProps {
    inputObj: InputObj;
    fieldValues: EstimateFormFields;
    setFieldValues: React.Dispatch<React.SetStateAction<EstimateFormFields>>;
}

const EstimateFormTextField = ({
    inputObj,
    fieldValues,
    setFieldValues,
}: EstimateFormTextFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = event.target;
        const updatedFieldValues = {
            ...fieldValues,
            [inputObj.id]: value,
        };
        setFieldValues(updatedFieldValues);
    };

    const inputProps = getInputProps(inputObj.type);

    return (
        <TextField
            key={inputObj.id}
            label={inputObj.label.value} //TODO label should be its own text field
            name={inputObj.label.value}
            value={fieldValues[inputObj.id]}
            onChange={handleChange}
            InputProps={inputProps}
            InputLabelProps={{ style: { fontSize: 20 } }} // Set the font size of the label text}
        />
    );
};

export default EstimateFormTextField;
