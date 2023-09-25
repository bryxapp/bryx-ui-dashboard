import { useTheme, Chip } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');  // Replace with your Stripe publishable key

const Subscription = () => {
    const theme = useTheme();
    const subscription = sessionStorage.getItem('subscription');

    const upgradeSubscription = async () => {
        try {
            // Fetch the Stripe session ID from your backend
            const response = await fetch('/api/create-checkout-session', { method: 'POST' }); // Adjust this API endpoint to your backend setup
            const session = await response.json();

            const stripe = await stripePromise;
            if (!stripe) return;
            const { error } = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (error) {
                console.error(error);
            }
        } catch (err) {
            console.error("Error redirecting to Stripe checkout:", err);
        }
    };

    return (
        <>
            <Chip
                label={subscription}
                onClick={upgradeSubscription}
                sx={{
                    marginRight: '10px',
                    color: theme.palette.text.secondary,
                    fontWeight: "bold",
                    cursor: "pointer" // To show it's clickable
                }}
            />
        </>
    );
};

export default Subscription;