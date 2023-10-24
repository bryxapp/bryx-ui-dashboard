import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { proSubscription } from '../../../utils/types/SubscriptionInterfaces';
import { updateUserToProSubscription } from '../../../utils/api/checkout-api';
import { useBryxUserContext } from '../../../utils/contexts/BryxUserContext';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import logger from '../../../logging/logger';
import ErrorMessage from '../../SharedComponents/ErrorMessage/ErrorMessage';

const ProCheckout = () => {
    const location = useLocation();
    const { auth0User, isLoading } = useAuth0User();
    const [error, setError] = useState(false);
    const { bryxUser, setBryxUser } = useBryxUserContext();

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

        // Fetch data on component mount
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search, isLoading, bryxUser]);

    if (error) return <ErrorMessage dataName='checkout' />;

    return (
        <Container>
            <Typography variant="h2" color="primary.main">Order Complete</Typography>
            <Typography variant="h6" fontWeight={'bold'} color="text.primary" sx={{ fontSize: '1.1rem', marginBottom: '15px' }}>
                Your subscription has been updated to {proSubscription.name}
            </Typography>
            <Typography variant="h4" color="primary.main">You now have access to</Typography>
            {proSubscription.features.map((feature, index) => (
                <Typography variant="body1" color="text.primary" key={index}>
                    {feature}
                </Typography>
            ))}
        </Container>
    );
};

export default ProCheckout;
