import { useState } from 'react';
import MenuItems from '../MenuItems/MenuItems';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useOrganizationContext } from '../../../utils/contexts/OrganizationContext';

const SideAppDrawer = () => {
    const theme = useTheme();
    const {isOwner} = useOrganizationContext();

    const [openDrawer, setOpenDrawer] = useState(false);

    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const SideAppDrawerWrapper = styled(Box)`
        background-color: ${theme.palette.background.paper};
        min-height: 90vh;
        padding: 1rem;
    `;

    const MenuButton = styled(IconButton)`
        margin-right: 16px;
    `;

    return (
        <>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MenuButton onClick={handleDrawerOpen}>
                    <MenuIcon sx={{fontSize:'2rem'}} />
                </MenuButton>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <SideAppDrawerWrapper>
                    <MenuItems isAdmin={isOwner}/>
                </SideAppDrawerWrapper>
            </Box>
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={handleDrawerClose}
                sx={{ display: { xs: 'block', sm: 'none' } }}
            >
                <Box sx={{ backgroundColor: theme.palette.background.default , minHeight: '100vh', padding: '1rem' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} >
                            BRYX
                        </Typography>
                        <CloseIcon onClick={handleDrawerClose} sx={{fontSize:'2rem'}} />
                    </Box>
                    <MenuItems isAdmin={isOwner} />
                </Box>
            </Drawer>
        </>
    );
};

export default SideAppDrawer;
