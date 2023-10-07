import React from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TemplatesGrid from "../../../SharedComponents/Templates/TemplatesGrid/TemplatesGrid";
import useTheme from '@mui/material/styles/useTheme';

const SelectTemplate = () => {
    const theme = useTheme();
    return (
        <React.Fragment>
            <Typography variant="h3" color={theme.palette.text.primary}>
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
                <TemplatesGrid
                    setMaxTemplatesReached={null}
                    baseUrl='/form?templateId=' />
            </Paper>
        </React.Fragment>
    )
}

export default SelectTemplate;