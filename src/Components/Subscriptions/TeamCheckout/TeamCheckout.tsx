import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import { createTeam } from '../../../utils/api/checkout-api';
import logger from '../../../logging/logger';
import ErrorMessage from '../../SharedComponents/ErrorMessage/ErrorMessage';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Card, Typography, Layout } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

const TeamCheckout = () => {
    const location = useLocation();
    const { auth0User, isLoading } = useAuth0User();
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

    if (error) return <ErrorMessage dataName='checkout' />;

    return (
        <>
            <Content style={{ marginTop: 32 }}>
                <Card style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto', padding: 24 }}>
                    <CheckCircleOutlined style={{ color: 'green', fontSize: 60 }} />
                    <Title level={4}>
                        Order Complete
                    </Title>
                    <Title level={5}>
                        You have successfully created your new team!
                    </Title>
                    <Typography.Text>
                        You can now switch between your different teams using the 'Change Team' button below.
                    </Typography.Text>
                </Card>
            </Content>
        </>
    );
};

export default TeamCheckout;
