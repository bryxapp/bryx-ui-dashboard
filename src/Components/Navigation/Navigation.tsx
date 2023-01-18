import React from 'react';
import { useState, } from 'react';
import Box from '@mui/material/Box';
import Drawer from './Drawer/Drawer';
import AppBar from './AppBar/AppBar';
import Footer from './Footer/Footer';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

const theme = null;
const drawerWidth: number = 225;

const Navigation = (props: any) => {

    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };


    return (
        <React.Fragment>
            <Box sx={{ display: 'flex' }}>
                <AppBar open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} theme={theme} />
                <Drawer open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} theme={theme} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '95vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        {props.children}
                    </Container>
                </Box>
            </Box>
            <Footer />
        </React.Fragment>
    );
}
export default Navigation;

