import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TopNavBar from './TopNavBar/TopNavBar';
import Sidebar from './SideAppDrawer/SideAppDrawer';
import { useTheme } from '@mui/material/styles';
import { useAuth0User } from '../../utils/customHooks/useAuth0User';

interface NavigationProps {
    children: ReactNode;
}

const Navigation = ({ children }: NavigationProps) => {
    const theme = useTheme();
    const { auth0User } = useAuth0User();

    return (
        <React.Fragment>
            <TopNavBar />
            <Box
                component="main"
                sx={{
                    backgroundColor: theme.palette.background.default,
                    display: 'flex',
                    flexDirection: 'row',
                    height: '95vh',
                }}
            >
                {auth0User &&
                    <Sidebar />
                }
                <Box
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        flexGrow: 1,
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        {children}
                    </Container>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default Navigation;
