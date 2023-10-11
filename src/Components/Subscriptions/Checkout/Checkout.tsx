import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SubscriptionInfo, SubscriptionType, mapSubscriptionToInfo } from '../../../utils/types/SubscriptionInterfaces';
import { Container } from '@mui/material';
import { updateSubscription } from '../../../utils/api/user-api';
import ErrorMessage from './ErrorMessage';
import OrderComplete from './OrderComplete';

const Checkout = () => {
    const location = useLocation();
    const [newSubscriptionInfo, setNewSubscriptionInfo] = useState({} as SubscriptionInfo);
    const [errorMessage, setErrorMessage] = useState('');
    const [orderSuccess, setOrderSuccess] = useState(false);

    useEffect(() => {
        const newSubscriptionName = localStorage.getItem('newSubscriptionName');
        if (newSubscriptionName && newSubscriptionName !== newSubscriptionInfo.name) {
            setNewSubscriptionInfo(mapSubscriptionToInfo(newSubscriptionName as SubscriptionType));
        }
    }, [location.search, newSubscriptionInfo.name]);

    useEffect(() => {
        const fetchData = async () => {
            const query = new URLSearchParams(location.search);
            if (query.get("success")) {
                try {
                    debugger;
                    const sessionId = query.get("session_id");
                    if (!sessionId) {
                        throw new Error("Error retrieving session id");
                    }
                    const response = await updateSubscription(sessionId);
                    if (!response) {
                        throw new Error("Error updating subscription");
                    }
                    const updatedSubscription = response.subscription as SubscriptionInfo;
                    // Update local storage
                    localStorage.removeItem('newSubscriptionName')
                    localStorage.setItem("subscriptionName", updatedSubscription.name);

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
        fetchData();
    }, [location.search, newSubscriptionInfo.name]);

    return (
        <Container>
            {orderSuccess && <OrderComplete newSubscriptionInfo={newSubscriptionInfo} />}
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        </Container>
    );
};

export default Checkout;
