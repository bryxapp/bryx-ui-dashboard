import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { teamSubscription } from '../../../utils/types/SubscriptionInterfaces';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import { createTeam } from '../../../utils/api/checkout-api';
import AuthButton from '../../NotLoggedIn/AuthButton';
import { LogoutOptions } from '@auth0/auth0-react';

const TeamCheckout = () => {
    const location = useLocation();
    const { auth0User, isLoading, logout } = useAuth0User();
    const [errorMessage, setErrorMessage] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);

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
                    await createTeam(sessionId, auth0User.sub);
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
    }, [location.search, isLoading]);

    const handleLogout = () => {
        logout({ returnTo: 'dashboard.bryxbids.com' } as LogoutOptions);
      };

    return (
        <Container>
            {orderSuccess && <Container>
                <Typography variant="h2" color="primary.main">Order Complete</Typography>
                <Typography variant="h6" fontWeight={'bold'} color="text.primary" sx={{ fontSize: '1.1rem', marginBottom: '15px' }}>
                    You have created your new team!
                </Typography>
                <Typography variant="h4" color="primary.main">You will need to logout and then log back in to your new team to all your cool new features</Typography>
                {teamSubscription.features.map((feature, index) => (
                    <Typography variant="body1" color="text.primary" key={index}>
                        {feature}
                    </Typography>
                ))}
                <AuthButton onClick={handleLogout} text="Log Out"/>
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
