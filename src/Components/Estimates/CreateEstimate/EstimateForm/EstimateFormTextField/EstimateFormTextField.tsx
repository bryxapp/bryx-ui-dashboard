import React from 'react';
import TextField from '@mui/material/TextField';
import { TextInputObj, TextInputFormat } from '../../../../../utils/types/CanvasInterfaces';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ParagraphIcon from '@mui/icons-material/ViewHeadline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TextIcon from '@mui/icons-material/TextFields';
import NumberIcon from '@mui/icons-material/Numbers';

interface EstimateFormTextFieldProps {
    textInputObj: TextInputObj;
    index: number;
    fieldValues: string[];
    setFieldValues: React.Dispatch<React.SetStateAction<string[]>>;
}

const EstimateFormTextField = ({
    textInputObj,
    index,
    fieldValues,
    setFieldValues,
}: EstimateFormTextFieldProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const newFieldValues = [...fieldValues];
        newFieldValues[index] = value;
        setFieldValues(newFieldValues);
    };

    const getInputProps = (format: TextInputFormat) => {
        switch (format) {
            case 'number':
                return { type: 'number', startAdornment: <NumberIcon />};
            case 'date':
                return { type: 'date', startAdornment: <DateRangeIcon /> };
            case 'email':
                return { type: 'email', startAdornment: <MailOutlineIcon /> };
            case 'phone':
                return { type: 'tel', startAdornment: <PhoneIcon /> };
            case 'paragraph':
                return { type: 'text', multiline: true, rows: 4, startAdornment: <ParagraphIcon /> };
            case 'currency':
                return { type: 'text', startAdornment: <AttachMoneyIcon /> };
            default:
                return { type: 'text', startAdornment: <TextIcon />  };
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
            InputProps={inputProps}
            InputLabelProps={{ style: { fontSize: 20 } }} // Set the font size of the label text
        />
    );
};

export default EstimateFormTextField;
