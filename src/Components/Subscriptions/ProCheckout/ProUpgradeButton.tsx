import { Button } from "@mui/material";
import { useAccessToken } from "../../../utils/customHooks/useAccessToken";
import { createCheckoutSession } from "../../../utils/api/checkout-api";
import { proSubscription } from "../../../utils/types/SubscriptionInterfaces";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = process.env.REACT_APP_STRIPE_KEY ? loadStripe(process.env.REACT_APP_STRIPE_KEY) : null;

interface Props {
    closeDialog: () => void;
}

const ProUpgradeButton = ({ closeDialog }: Props) => {
    const { user } = useAccessToken();

    const handleCheckout = async () => {
        try {
            if (!user?.sub) {
                throw new Error("User not found");
            }

            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error("Stripe is not initialized.");
            }

            const session = await createCheckoutSession(proSubscription.stripeId);
            if (!session) {
                throw new Error("Session creation failed.");
            }
            //redirect to stripe checkout
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                throw new Error("Error redirecting to checkout.");
            }
            closeDialog();
        } catch (error) {
            console.error("An error occurred during the checkout process:", error);
        }
    };
    return (
        <Button variant="contained" color="primary" size="large" onClick={handleCheckout}>
            Upgrade
        </Button>
    );
}

export default ProUpgradeButton;