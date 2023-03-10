import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const AuthButtons = styled(Button)`
    color: white;
    font-size: 1.5rem;
    &:hover {
        color: gray;
    }
`;


const TopNavBar = () => {
    const { loginWithRedirect, logout, user, isLoading } = useAuth0();
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
                    (<AuthButtons color="inherit" onClick={() => logout()}>Logout</AuthButtons>)}
                {!isLoading && !user &&
                    (<AuthButtons color="inherit" onClick={() => loginWithRedirect()}>Login</AuthButtons>)
                }
            </Toolbar>
        </AppBar>
    );
};

export default TopNavBar;
