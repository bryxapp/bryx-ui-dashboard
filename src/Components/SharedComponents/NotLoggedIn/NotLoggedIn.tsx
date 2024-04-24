import { Button, Card, Space } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import logger from '../../../logging/logger';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import Title from 'antd/es/typography/Title';

const NotLoggedIn = () => {
    const { loginWithRedirect } = useAuth0User();

    const handleSignUp = async () => {
        logger.trackEvent({ name: 'SignUp', properties: { environment: process.env.NODE_ENV } });
        await loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } });
    };

    const handleLogin = async () => {
        logger.trackEvent({ name: 'Login', properties: { environment: process.env.NODE_ENV } });
        await loginWithRedirect();
    };

    return (
        <Card>
            <Title level={4} style={{ textAlign: "center" }}>
                Please Log In or Sign Up to Continue
            </Title>
            <Space direction="vertical" size="middle" style={{ padding: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button
                    onClick={handleLogin}
                    icon={<LoginOutlined />}
                    size='large'
                >
                    Login
                </Button>
                <Button
                    onClick={handleSignUp}
                    icon={<UserAddOutlined />}
                    size='large'
                >
                    Sign Up
                </Button>
            </Space>
        </Card>
    );
};

export default NotLoggedIn;