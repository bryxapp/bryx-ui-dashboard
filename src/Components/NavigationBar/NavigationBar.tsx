import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from './Drawer/Drawer';
import AppBar from './AppBar/AppBar';

const drawerWidth: number = 225;
const theme = null;

const Dashboard = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} theme={theme} />
            <Drawer open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} theme={theme} />
        </Box>
    );
}

export default Dashboard;

