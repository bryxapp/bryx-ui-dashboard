import React from 'react';
import { Box, Typography, useTheme, Button } from '@mui/material';
import { loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from '../../utils/api/checkout-api';
import ErrorDialog from './ErrorDialog/ErrorDialog';

interface Subscription {
    id: string;
    name: string;
    monthlyPrice: string;
    features: string[];
    stripeId: string;
}

interface Props {
    subscriptionInfo: Subscription;
    currentSubscription: string | null;
}

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY!);

const SubscriptionTile: React.FC<Props> = ({ subscriptionInfo, currentSubscription }) => {
    const [isErrorDialogOpen, setIsErrorDialogOpen] = React.useState(false);
    const theme = useTheme();
    const handleCheckout = async () => {
        const stripe = await stripePromise;
        const session = await createCheckoutSession(subscriptionInfo.stripeId);
        //if session is undefined then display error message
        if (!session) {
            setIsErrorDialogOpen(true);
            return;
        }
        await stripe?.redirectToCheckout({ sessionId: session.id });
        //if success then remove current subscription from session storage and fetch new subscription info
        if (session.success) {
            localStorage.removeItem('subscription');
        }
        //if fail then display error message
        if (session.error) {
            setIsErrorDialogOpen(true);
            return;
        }
        //if cancel then do nothing
        if (session.cancel) {
            return;
        }
    };

    return (
        <Box
            sx={{
                width: '240px',
                height: '300px',
                borderRadius: '15px',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme.palette.primary.main,
                background: theme.palette.secondary.main,
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main">{subscriptionInfo.name}</Typography>
                <Typography variant="h6" color="text.primary">{subscriptionInfo.monthlyPrice}</Typography>
            </Box>
            <Box sx={{ overflow: 'auto', maxHeight: '120px' }}>
                {subscriptionInfo.features.map((feature, index) => (
                    <Typography
                        variant="body1"
                        color="text.primary"
                        key={index}
                        sx={{ fontSize: '1.1rem', marginBottom: '15px' }} // Adjust this value for desired size
                    >
                        - {feature}
                    </Typography>
                ))}
            </Box>
            {subscriptionInfo.name.toLowerCase() === 'starter' && (
                <Typography variant="h6" fontWeight={'bold'} color="text.primary" sx={{ fontSize: '1.1rem', marginBottom: '15px' }}>
                    Current Subscription
                </Typography>
            )}
            {subscriptionInfo.name.toLowerCase() === 'pro' && (
                <Button variant="contained" color="primary" size="large" onClick={handleCheckout}>
                    Upgrade
                </Button>)}
            {subscriptionInfo.name.toLowerCase() === 'team' && (
                <Button variant="contained" color="primary" size="large" disabled>
                    Create Team (Coming Soon)
                </Button>)}
            <ErrorDialog open={isErrorDialogOpen} setOpen={setIsErrorDialogOpen} />
        </Box>
    );
};

export default SubscriptionTile;
