import React from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SelectTemplateList from "./SelectTemplateList/SelectTemplateList";
import useTheme from '@mui/material/styles/useTheme';

const SelectTemplate = () => {
    const theme = useTheme();
    const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';
    return (
        <React.Fragment>
            <Typography variant="h3" color={textColor}>
                Select a Template
            </Typography>
            <div style={{ height: 50 }} />
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <SelectTemplateList />
            </Paper>
        </React.Fragment>
    )
}

export default SelectTemplate;