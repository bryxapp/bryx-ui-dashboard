import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Footer from './Footer/Footer';
import Container from '@mui/material/Container';
import TopNavBar from './TopNavBar/TopNavBar';
import Sidebar from './SideAppDrawer/SideAppDrawer';
import { useTheme } from '@mui/material/styles';

interface NavigationProps {
    children: ReactNode;
    onToggleTheme: () => void;
    themeMode: string;
}

const Navigation = ({ children, onToggleTheme, themeMode }: NavigationProps) => {
    const theme = useTheme();

    return (
        <React.Fragment>
            <TopNavBar onToggleTheme={onToggleTheme} themeMode={themeMode} />
            <Box
                component="main"
                sx={{
                    backgroundColor: theme.palette.background.default,
                    display: 'flex',
                    flexDirection: 'row',
                    height: '95vh',
                }}
            >
                <Sidebar />
                <Box
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        flexGrow: 1,
                        overflow: 'auto',
                    }}
                >
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        {children}
                    </Container>
                </Box>
            </Box>
            <Footer />
        </React.Fragment>
    );
};

export default Navigation;
