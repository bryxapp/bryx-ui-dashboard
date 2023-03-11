import { TextField } from '@mui/material';
import React from 'react';

interface Props {
    name: string;
    index: number;
    value: string;
    onValueChange: (index: number, value: string) => void;
}

const EstimateFormTextField: React.FC<Props> = ({ name, index, value, onValueChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onValueChange(index, value);
    };

    return (
            <TextField
                key={index}
                type="text"
                label={name}
                name={name}
                value={value}
                onChange={handleChange}
            />
    );
};

export default EstimateFormTextField;
