import { useEffect } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { LogoutOptions } from '@auth0/auth0-react';
import { Button, Box, useTheme, Chip } from '@mui/material';
import styled from '@emotion/styled';
import logger from '../../../logging/logger';
import { useAuth0 } from '@auth0/auth0-react';
import { useAccessToken } from '../../../utils/customHooks/useAccessToken';
import { getSubscription } from "../../../utils/api/user-api";

const AuthButtons = styled(Button)`
  font-size: 1.5rem;
  padding: 10px;
  min-width: 100px;
`;

const Logo = styled(Typography)`
  font-size: 4rem;
  font-weight: bold;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`

const TopNavBar = () => {
  const { user, getAccessToken } = useAccessToken();
  const { loginWithRedirect, logout,isLoading } = useAuth0();
  const theme = useTheme();
  const subscription = sessionStorage.getItem('subscription'); // Get from sessionStorage

  const handleLogout = () => {
    logger.trackEvent({ name: 'Logout', properties: { user: user?.name, environment: process.env.NODE_ENV } });
    sessionStorage.removeItem('subscription'); // Clear from sessionStorage on logout
    logout({ returnTo: 'https://www.bryxbids.com/' } as LogoutOptions);
  };

  const handleLogin = async () => {
    logger.trackEvent({ name: 'Login', properties: { user: user?.name, environment: process.env.NODE_ENV } });
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
        <Logo variant="h1" color={theme.palette.text.secondary} noWrap>
          BRYX bids
        </Logo>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip label={subscription} sx={{ marginRight: '10px' }} />
          {isLoading||user ? (
            <AuthButtons color="inherit" onClick={handleLogout}>
              Logout
            </AuthButtons>
          ) : (
            <AuthButtons color="inherit" onClick={handleLogin}>
              Login
            </AuthButtons>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;