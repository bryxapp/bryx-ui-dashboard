import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import { createTeam } from '../../../utils/api/checkout-api';
import logger from '../../../logging/logger';
import ErrorMessage from '../../SharedComponents/ErrorMessage/ErrorMessage';
import { LogoutOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Button, Card, Typography, Layout } from 'antd';
import { LogoutOptions } from '@auth0/auth0-react';
const { Content } = Layout;
const { Title, Text } = Typography;

const TeamCheckout = () => {
    const location = useLocation();
    const { auth0User, isLoading, logout } = useAuth0User();
    const [error, setError] = useState(false);
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(location.search);

            if (!requestSent && query.get("success")) {
                try {
                    if (isLoading || !auth0User) return;
                    const sessionId = query.get("session_id");
                    if (!sessionId || !auth0User?.sub) {
                        throw new Error("Error retrieving session id or user id");
                    }
                    await createTeam(sessionId, auth0User.sub);
                    setError(false);
                    setRequestSent(true);
                } catch (error) {
                    console.error("An error occurred during the checkout success process:", error);
                    setError(true);
                    logger.trackException({
                        properties: {
                            name: "Checkout Success Error",
                            page: "Checkout",
                            description: "Error creating team",
                            error: error,
                        },
                    });
                }
            } else if (query.get("canceled")) {
                setError(true);
                logger.trackException({
                    properties: {
                        name: "Checkout Canceled Error",
                        page: "Checkout",
                        description: "User canceled checkout",
                    },
                });
                console.error("Checkout canceled");
            }
        };

        fetchData();
    }, [location.search, isLoading, auth0User, requestSent]);

    const handleLogout = () => {
        logout({ returnTo: 'dashboard.bryxbids.com' } as LogoutOptions);
    };

    if (error) return <ErrorMessage dataName='checkout' />;

    return (
        <Content style={{ marginTop: 32 }}>
            <Card style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', padding: 24 }}>
                <CheckCircleOutlined style={{ color: 'green', fontSize: 60 }} />
                <Title level={4}>
                    Order Complete
                </Title>
                <Title level={5}>
                    You have successfully created your new team!
                </Title>
                <Text>
                    You will need to log out and then log back in to access your new team.
                </Text>
                <Button type='primary' onClick={handleLogout} icon={<LogoutOutlined />} size='large' style={{ marginTop: 20 }}>
                    Log Out
                </Button>
            </Card>
        </Content>
    );
};

export default TeamCheckout;
