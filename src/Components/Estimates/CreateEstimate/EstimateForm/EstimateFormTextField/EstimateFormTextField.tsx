import { TextField } from '@mui/material';
import React from 'react';
import Typography from '@mui/material/Typography';

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
        <>
            <Typography variant="h6" sx={{ padding: 1 }}>
                {name}
            </Typography>
            <TextField
                key={index}
                type="text"
                label={name}
                name={name}
                value={value}
                onChange={handleChange}
            />
            <div style={{ height: 15 }}></div>
        </>
    );
};

export default EstimateFormTextField;
