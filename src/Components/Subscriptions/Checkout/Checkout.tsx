import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SubscriptionInfo, SubscriptionType, mapSubscriptionToInfo } from '../../../utils/types/SubscriptionInterfaces';
import { Container } from '@mui/material';
import { updateSubscription } from '../../../utils/api/checkout-api';
import ErrorMessage from './ErrorMessage';
import OrderComplete from './OrderComplete';
import { useAccessToken } from '../../../utils/customHooks/useAccessToken';

const Checkout = () => {
    const location = useLocation();
    const { user } = useAccessToken();
    const [newSubscriptionInfo, setNewSubscriptionInfo] = useState({} as SubscriptionInfo);
    const [errorMessage, setErrorMessage] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(location.search);

            if (query.get("success")) {
                try {
                    const sessionId = query.get("session_id");

                    if (!sessionId) {
                        throw new Error("Error retrieving session id");
                    }

                    if (!user?.sub) {
                        throw new Error("Error retrieving user id");
                    }

                    const response = await updateSubscription(sessionId, user.sub, newSubscriptionInfo.name);

                    if (!response || response.status !== 200) {
                        throw new Error("Error updating subscription");
                    }

                    // Update local storage
                    localStorage.removeItem('newSubscriptionName');
                    localStorage.setItem("subscriptionName", newSubscriptionInfo.name);

                    // Clear search parameters
                    window.history.replaceState({}, document.title, "/checkout");
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

    useEffect(() => {
        const newSubscriptionName = localStorage.getItem('newSubscriptionName');

        if (newSubscriptionName && newSubscriptionName !== newSubscriptionInfo.name) {
            setNewSubscriptionInfo(mapSubscriptionToInfo(newSubscriptionName as SubscriptionType));
        }
    }, [newSubscriptionInfo.name]);

    return (
        <Container>
            {orderSuccess && <OrderComplete newSubscriptionInfo={newSubscriptionInfo} />}
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        </Container>
    );
};

export default Checkout;
