import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { proSubscription } from '../../../utils/types/SubscriptionInterfaces';
import { useAccessToken } from '../../../utils/customHooks/useAccessToken';
import { createTeam } from '../../../utils/api/checkout-api';

const TeamCheckout = () => {
    const location = useLocation();
    const { user } = useAccessToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(location.search);

            if (query.get("success")) {
                try {
                    const sessionId = query.get("session_id");
                    if (!sessionId || !user?.sub) {
                        throw new Error("Error retrieving session id or user id");
                    }

                    await createTeam(sessionId, user.sub);

                    localStorage.setItem("subscriptionName", proSubscription.name);

                    // Clear search parameters
                    window.history.replaceState({}, document.title, "/teamCheckout");
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
    }, [location.search]);

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

export default TeamCheckout;
