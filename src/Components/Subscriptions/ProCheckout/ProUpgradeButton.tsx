import { useState } from "react";
import { Button } from "@mui/material";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import { createProCheckoutSession } from "../../../utils/api/checkout-api";
import { loadStripe } from "@stripe/stripe-js";
import { CircularProgress } from "@mui/material";
import logger from "../../../logging/logger";
import ErrorMessage from "../../SharedComponents/ErrorMessage/ErrorMessage";
const stripePromise = process.env.REACT_APP_STRIPE_KEY ? loadStripe(process.env.REACT_APP_STRIPE_KEY) : null;

interface Props {
    closeDialog: () => void;
}

const ProUpgradeButton = ({ closeDialog }: Props) => {
    const { auth0User } = useAuth0User();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const handleCheckout = async () => {
        setError(false);
        setLoading(true);
        try {
            if (!auth0User?.sub) {
                throw new Error("User not found");
            }

            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error("Stripe is not initialized.");
            }
            const email = auth0User?.email || "";
            const session = await createProCheckoutSession(email);
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
            logger.trackException({
                properties: {
                    name: "Checkout Error",
                    page: "Checkout",
                    description: "Error creating checkout session",
                    error: error,
                },
            });
            setError(true);
            console.error("An error occurred during the checkout process:", error);
        }
        setLoading(false);
    };
    
    if (error) return <ErrorMessage dataName="checkout" />;

    return (
        <Button variant="contained" color="primary" size="large" onClick={handleCheckout} disabled={loading}>
            {loading ? <CircularProgress color="secondary" size={20} /> : "Upgrade to Pro"}
        </Button>
    );
}

export default ProUpgradeButton;