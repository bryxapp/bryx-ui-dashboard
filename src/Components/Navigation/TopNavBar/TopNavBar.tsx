import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { useAuth0, LogoutOptions } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import logger from '../../../logging/logger';

const AuthButtons = styled(Button)`
    color: white;
    font-size: 1.5rem;
    &:hover {
        color: gray;
    }
`;


const TopNavBar = () => {
    const { loginWithRedirect, logout, user, isLoading } = useAuth0();
    const handleLogout = () => {
        logger.trackEvent({ name: 'Logout', properties: { user: user?.name } });
        logout({ returnTo: process.env.REACT_APP_AUTH0_LOGOUT_URL } as LogoutOptions);
    };

    const handleLogin = () => {
        logger.trackEvent({ name: 'Login' });
        loginWithRedirect();
    };

    return (
        <AppBar>
            <Toolbar>
                <Typography
                    component="h1"
                    variant="h3"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    BRYX
                </Typography>
                {!isLoading && user &&
                    (<AuthButtons color="inherit" onClick={() => handleLogout()}>Logout</AuthButtons>)}
                {!isLoading && !user &&
                    (<AuthButtons color="inherit" onClick={() => handleLogin()}>Login</AuthButtons>)
                }
            </Toolbar>
        </AppBar>
    );
};

export default TopNavBar;
