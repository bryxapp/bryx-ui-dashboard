import React, { useState } from 'react';
import List from '@mui/material/List';
import MenuItems from '../MenuItems/MenuItems';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import logger from '../../../logging/logger';
import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const SideAppDrawerWrapper = styled(Box)`
  background-color: #e5e5e5;
  min-height: 90vh;
  padding: 1rem;
`;

const NewEstimateButton = styled(Button)`
  width: 100%;
  margin: 1rem 0;
  font-size: 1.2rem;
`;

const MenuButton = styled(IconButton)`
  margin-right: 16px;
`;

const MenuIconWrapper = styled(MenuIcon)`
  color: white;
  font-size: 2rem;
`;

const CloseIconWrapper = styled(CloseIcon)`
  color: white;
  font-size: 2rem;
`;

const SideAppDrawer = () => {
    const { user } = useAuth0();
    const handleNewEstimateClick = () => {
        logger.trackEvent({
            name: 'New Estimate Click',
            properties: { menu: 'New Estimate', user: user?.name, environment: process.env.NODE_ENV },
        });
    };

    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    return (
        <>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MenuButton onClick={handleDrawerOpen}>
                    <MenuIconWrapper />
                </MenuButton>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <SideAppDrawerWrapper>
                    <List component="nav" sx={{ alignItems: 'center' }}>
                        {MenuItems}
                    </List>
                    <Link href="/select-template" onClick={handleNewEstimateClick}>
                        <NewEstimateButton variant="contained" color="primary">
                            + New Estimate
                        </NewEstimateButton>
                    </Link>
                </SideAppDrawerWrapper>
            </Box>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={handleDrawerClose}
                sx={{ display: { xs: 'block', sm: 'none' } }}
            >
                <Box sx={{ backgroundColor: '#e5e5e5', minHeight: '100vh', padding: '1rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} >
                            BRYX
                        </Typography>
                        <CloseIconWrapper onClick={handleDrawerClose} />
                    </Box>
                    <List component="nav" sx={{ alignItems: 'center' }}>
                        {MenuItems}
                    </List>
                    <Link href="/select-template" onClick={handleNewEstimateClick}>
                        <NewEstimateButton variant="contained" color="primary">
                            + New Estimate
                        </NewEstimateButton>
                    </Link>
                </Box>
            </Drawer>
        </>
    );
};

export default SideAppDrawer;
