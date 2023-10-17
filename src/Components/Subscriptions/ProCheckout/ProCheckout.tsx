import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { proSubscription } from '../../../utils/types/SubscriptionInterfaces';
import { updateUserToProSubscription } from '../../../utils/api/checkout-api';
import { useSubscriptionContext } from '../../../utils/contexts/SubscriptionContext';
import { useAccessToken } from '../../../utils/customHooks/useAccessToken';

const ProCheckout = () => {
    const location = useLocation();
    const { auth0User, isLoading } = useAccessToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);
    const { setSubscription } = useSubscriptionContext();

    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(location.search);

            if (query.get("success")) {
                try {
                    if (isLoading || !auth0User) return;
                    const sessionId = query.get("session_id");
                    if (!sessionId || !auth0User?.sub) {
                        throw new Error("Error retrieving session id or user id");
                    }

                    await updateUserToProSubscription(sessionId, auth0User.sub);

                    setSubscription(proSubscription);

                    // Clear search parameters
                    window.history.replaceState({}, document.title, "/pro-checkout");
                    setErrorMessage('');
                    setOrderSuccess(true);
                } catch (error) {
                    console.error("An error occurred during the checkout success process:", error);
                    setErrorMessage("An error occurred during the payment process.");
                }
            } else if (query.get("canceled")) {
                setErrorMessage("Order canceled -- continue to shop around and checkout when you're ready.");
            }
        };

        // Fetch data on component mount
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search,isLoading]);

    return (
        <Container>
            {orderSuccess && <Container>
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
            </Container>}
            {errorMessage && <section>
                <Typography variant="body1" color="error" id="payment-message">
                    {errorMessage}
                </Typography>
            </section>}
        </Container>
    );
};

export default ProCheckout;
