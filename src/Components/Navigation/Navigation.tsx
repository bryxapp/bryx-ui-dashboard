import React from 'react';
import Box from '@mui/material/Box';
import Footer from './Footer/Footer';
import Container from '@mui/material/Container';
import TopNavBar from './TopNavBar/TopNavBar';
import Sidebar from './SideAppDrawer/SideAppDrawer';

const Navigation = (props: any) => {
    return (
        <React.Fragment>
            <TopNavBar />
            <Box
                component="main"
                sx={{
                    backgroundColor: '#f4f6f8',
                    display: 'flex',
                    flexDirection: 'row',
                    height: '95vh',
                }}
            >
                <Sidebar />
                <Box
                    sx={{
                        backgroundColor: '#f4f6f8',
                        flexGrow: 1,
                        overflow: 'auto',
                    }}
                >
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
