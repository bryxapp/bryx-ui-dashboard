import { Button } from 'antd';
import { LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import logger from '../../../logging/logger';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import Logo from "./Logo";
import { LogoutOptions } from '@auth0/auth0-react';
import { Header } from 'antd/es/layout/layout';
import SwitchAccounts from './SwitchAccounts';
import { useLocation } from 'react-router-dom';

const TopNavBar = () => {
  const { auth0User, isLoading, loginWithRedirect, logout } = useAuth0User();
  const url = useLocation();
  const isViewingEstimate = url.pathname === "/view" || url.pathname === "/view/" ? true : false;

  const handleLogout = () => {
    logger.trackEvent({ name: 'Logout', properties: { user: auth0User?.sub, environment: process.env.NODE_ENV } });
    logout({ returnTo: 'https://dashboard.bryxbids.com/' } as LogoutOptions); // Adjust as needed based on your logout options handling in Ant Design
  };

  const handleLogin = async () => {
    logger.trackEvent({ name: 'Login', properties: { environment: process.env.NODE_ENV } });
    await loginWithRedirect();
  };

  if (isViewingEstimate) {
    return (
      <Header style={{ display: "flex", justifyContent: "center", alignItems: 'center', padding: '0 10px 0 10px' }}>
        <Logo />
      </Header>
    )
  }

  return (
    <Header style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', padding: '0 10px 0 10px' }}>
      <Logo />
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '2rem' }}>
        {isLoading || auth0User ? (
          <>
            <SwitchAccounts />
            <Button
              onClick={handleLogout}
              icon={<LogoutOutlined />}
              type="primary"
              size="large"
              style={{ marginLeft: 12 }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            onClick={handleLogin}
            icon={<LoginOutlined />}
            type="primary"
            size="large"
            style={{ marginLeft: 12 }}
          >
            Login
          </Button>
        )}
      </div>
    </Header>
  );
};

export default TopNavBar;
