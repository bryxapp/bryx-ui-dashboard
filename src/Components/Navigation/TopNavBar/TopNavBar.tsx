import { useEffect } from "react";
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import { LogoutOptions } from '@auth0/auth0-react';
import { Box } from '@mui/material';
import logger from '../../../logging/logger';
import { useAuth0 } from '@auth0/auth0-react';
import { useAccessToken } from '../../../utils/customHooks/useAccessToken';
import { getSubscription } from "../../../utils/api/user-api";
import Subscription from "./Subscription/Subscription";
import Logo from "./Logo";
import AuthButton from "./AuthButton";

const TopNavBar = () => {
  const { user, getAccessToken } = useAccessToken();
  const { loginWithRedirect, logout, isLoading } = useAuth0();
  const subscription = sessionStorage.getItem('subscription'); // Get from sessionStorage

  const handleLogout = () => {
    logger.trackEvent({ name: 'Logout', properties: { user: user?.name, environment: process.env.NODE_ENV } });
    sessionStorage.removeItem('subscription'); // Clear from sessionStorage on logout
    logout({ returnTo: 'https://www.bryxbids.com/' } as LogoutOptions);
  };

  const handleLogin = async () => {
    logger.trackEvent({ name: 'Login', properties: { environment: process.env.NODE_ENV } });
    await loginWithRedirect();
  };

  useEffect(() => {
    async function fetchSubscription() {
      if (user && !subscription) {
        const token = await getAccessToken();
        if (token) {
          const sub = await getSubscription(token);
          if (!sub) return;
          sessionStorage.setItem('subscription', sub);  // Store in sessionStorage
        }
      }
    }

    // If there's no subscription in sessionStorage and the user is logged in, fetch it.
    if (user && !subscription) {
      fetchSubscription();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.sub]);

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