import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { TextInputObj, TextInputFormat } from '../../../../../utils/types/CanvasInterfaces';

interface EstimateFormTextFieldProps {
    textInputObj: TextInputObj;
    index: number;
    fieldValues: string[];
    setFieldValues: React.Dispatch<React.SetStateAction<string[]>>;
}

const EstimateFormTextField = ({ textInputObj, index, fieldValues, setFieldValues }: EstimateFormTextFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newFieldValues = [...fieldValues];
        newFieldValues[index] = value;
        setFieldValues(newFieldValues);
    };

    const getInputProps = (format: TextInputFormat) => {
        switch (format) {
            case 'number':
                return { type: 'number' };
            case 'date':
                return { type: 'date' };
            case 'email':
                return { type: 'email' };
            case 'phone':
                return { type: 'tel' };
            case 'paragraph':
                return { type: 'text', multiline: true };
            case 'currency':
                return { type: 'text', isCurrency: true };
            default:
                return { type: 'text' };
        }
    };

    const inputProps = getInputProps(textInputObj.format);

    return (
        <TextField
            key={index}
            label={textInputObj.displayName}
            name={textInputObj.displayName}
            value={fieldValues[index]}
            onChange={handleChange}
            {...inputProps}
            InputProps={
                inputProps.isCurrency
                    ? {
                        startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                        ),
                    }
                    : undefined
            }
        />
    );

};

export default EstimateFormTextField;
