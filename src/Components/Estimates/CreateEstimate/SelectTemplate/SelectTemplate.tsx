import React from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import SelectTemplateList from "./SelectTemplateList/SelectTemplateList";

const SelectTemplate = () => {
    return (
        <React.Fragment>
            <Typography variant="h3" color="dark">
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