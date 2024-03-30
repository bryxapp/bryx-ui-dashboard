import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Typography, Layout, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { proSubscription } from '../../../utils/types/SubscriptionInterfaces';
import { updateUserToProSubscription } from '../../../utils/api/checkout-api';
import { useBryxUserContext } from '../../../utils/contexts/BryxUserContext';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import logger from '../../../logging/logger';
import ErrorMessage from '../../SharedComponents/ErrorMessage/ErrorMessage';

const { Content } = Layout;
const { Title, Text } = Typography;

const ProCheckout = () => {
    const location = useLocation();
    const { auth0User, isLoading } = useAuth0User();
    const [error, setError] = useState(false);
    const { bryxUser, setBryxUser } = useBryxUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(location.search);

            if (query.get("success")) {
                try {
                    if (isLoading || !auth0User || !bryxUser || bryxUser.subscription === proSubscription.name) return;
                    const sessionId = query.get("session_id");
                    if (!sessionId || !auth0User?.sub) {
                        throw new Error("Error retrieving session id or user id");
                    }
                    await updateUserToProSubscription(sessionId, auth0User.sub);
                    setBryxUser({ ...bryxUser, subscription: proSubscription.name });
                    setError(false);
                    // Clear search parameters
                    window.history.replaceState({}, document.title, "/pro-checkout");
                } catch (error) {
                    setError(true);
                    logger.trackException({
                        properties: {
                            name: "Checkout Success Error",
                            page: "Checkout",
                            description: "Error updating user to pro subscription",
                            error: error,
                        },
                    });
                    console.error("An error occurred during the checkout success process:", error);
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
    }, [location.search, isLoading, auth0User, bryxUser, setBryxUser]);

    const handleClick = () => {
        navigate('/');
    };

    if (error) return <ErrorMessage dataName='checkout' />;

    return (
        <Layout>
            <Content style={{ padding: '24px', maxWidth: '600px', margin: '24px auto' }}>
                <Card style={{ textAlign: 'center', padding: '24px' }}>
                    <CheckCircleOutlined style={{ color: 'green', fontSize: '60px', marginBottom: '12px' }} />
                    <Title level={4}>
                        Order Complete
                    </Title>
                    <Text strong style={{ fontSize: '18px', marginBottom: '15px', display: 'block' }}>
                        Your subscription has been updated to {proSubscription.name}
                    </Text>
                    <Button type='primary' onClick={handleClick} size='large' style={{ marginTop: 20 }}>
                        Go To Estimates
                    </Button>
                </Card>
            </Content>
        </Layout>
    );
};

export default ProCheckout;