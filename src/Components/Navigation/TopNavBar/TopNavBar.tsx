import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { useAuth0, LogoutOptions } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import logger from '../../../logging/logger';

const AuthButtons = styled(Button)`
  font-size: 1.5rem;
  padding: 10px;
  min-width: 100px;
`;

const Logo = styled(Typography)`
  font-size: 4rem;
  font-weight: bold;
`;

const TopNavBar = () => {
  const { loginWithRedirect, logout, user, isLoading } = useAuth0();
  const handleLogout = () => {
    logger.trackEvent({ name: 'Logout', properties: { user: user?.name, environment: process.env.NODE_ENV } });
    logout({ returnTo: process.env.REACT_APP_AUTH0_LOGOUT_URL } as LogoutOptions);
  };

  const handleLogin = () => {
    logger.trackEvent({ name: 'Login', properties: { user: user?.name, environment: process.env.NODE_ENV } });
    loginWithRedirect();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo variant="h1" color="inherit" noWrap>
          BRYX
        </Logo>
        {!isLoading && user ? (
          <AuthButtons color="inherit" onClick={() => handleLogout()}>
            Logout
          </AuthButtons>
        ) : (
          <AuthButtons color="inherit" onClick={() => handleLogin()}>
            Login
          </AuthButtons>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
