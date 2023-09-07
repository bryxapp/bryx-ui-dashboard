import React from "react";
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CanvasStarterList from "./CanvasStarterList/CanvasStarterList";
import useTheme from '@mui/material/styles/useTheme';
import Button from "@mui/material/Button";

const SelectCanvasStarter = () => {
    const theme = useTheme();
    return (
        <React.Fragment>
            <Typography variant="h4" color={theme.palette.text.primary}>
                Choose a Starter Canvas or Create a New Design
            </Typography>
            <Typography variant="subtitle1" color={theme.palette.text.primary}>
                Get started by selecting a starter canvas or creating a new design from scratch.
            </Typography>
            <div style={{ height: 30 }} />
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CanvasStarterList />
            </Paper>
            <div style={{ height: 30 }} />
            <Button variant="contained" href="/create-template">Start From Scratch</Button>
        </React.Fragment>
    )
}

export default SelectCanvasStarter;
