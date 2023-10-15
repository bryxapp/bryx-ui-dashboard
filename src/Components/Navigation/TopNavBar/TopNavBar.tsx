import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { LogoutOptions } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import logger from '../../../logging/logger';
import { useAuth0 } from '@auth0/auth0-react';
import { useAccessToken } from '../../../utils/customHooks/useAccessToken';
import Subscription from "./Subscription/Subscription";
import Logo from "./Logo";
import AuthButton from "./AuthButton";

const TopNavBar = () => {
  const { user } = useAccessToken();
  const { loginWithRedirect, logout, isLoading } = useAuth0();

  const handleLogout = () => {
    logger.trackEvent({ name: 'Logout', properties: { user: user?.name, environment: process.env.NODE_ENV } });
    logout({ returnTo: 'https://dashboard.bryxbids.com/' } as LogoutOptions);
  };

  const handleLogin = async () => {
    logger.trackEvent({ name: 'Login', properties: { environment: process.env.NODE_ENV } });
    await loginWithRedirect();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Logo />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isLoading || user ? (
            <>
              <Subscription />
              <AuthButton onClick={handleLogout} text={"Logout"} />
            </>
          ) : (
            <AuthButton onClick={handleLogin} text={"Login"} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;