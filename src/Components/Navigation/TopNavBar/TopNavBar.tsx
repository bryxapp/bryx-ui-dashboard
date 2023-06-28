import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import { useAuth0, LogoutOptions } from '@auth0/auth0-react';
import { Button, Box, Switch, FormControlLabel } from '@mui/material';
import styled from '@emotion/styled';
import logger from '../../../logging/logger';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness2Icon from '@mui/icons-material/Brightness2';

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
`;

interface TopNavBarProps {
  onToggleTheme: () => void;
  themeMode: string;
}

const TopNavBar = ({ onToggleTheme, themeMode }: TopNavBarProps) => {
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
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={themeMode === 'dark'}
                onChange={onToggleTheme}
                color="secondary"
                inputProps={{ 'aria-label': 'toggle theme' }}
              />
            }
            label={themeMode === 'light' ? <Brightness4Icon /> : <Brightness2Icon />}
          />
          <Box sx={{ width: '16px' }} /> {/* Add spacing between the switch and the buttons */}
          {!isLoading && user ? (
            <AuthButtons color="inherit" onClick={() => handleLogout()}>
              Logout
            </AuthButtons>
          ) : (
            <AuthButtons color="inherit" onClick={() => handleLogin()}>
              Login
            </AuthButtons>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavBar;
