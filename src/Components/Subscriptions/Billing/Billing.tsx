import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import { loadStripe } from "@stripe/stripe-js";
import { createBillingSession } from "../../../utils/api/billing-api";
import logger from "../../../logging/logger";
import ErrorModal from "../../SharedComponents/ErrorModal/ErrorModal";

const stripePromise = process.env.REACT_APP_STRIPE_KEY
    ? loadStripe(process.env.REACT_APP_STRIPE_KEY)
    : null;
interface BillingButtonProps {
    onClose: () => void;
}
const BillingButton = ({ onClose }: BillingButtonProps) => {
    const { getAccessToken } = useAuth0User();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const handleManageBilling = async () => {
        setLoading(true);
        setError(false);
        try {
            const token = await getAccessToken();
            if (!token) {
                throw new Error("Access token not found.");
            }
            const stripe = await stripePromise;
            if (!stripe) {
                throw new Error("Stripe is not initialized.");
            }

            const session = await createBillingSession(token);
            if (!session) {
                throw new Error("Session creation failed.");
            }

            const debuggerUrl = `${session.url}?session_id=${session.id}`;
            window.open(debuggerUrl);

        } catch (error) {
            logger.trackException({
                properties: {
                    name: "Billing Error",
                    page: "Billing",
                    description: "Error creating billing session",
                    error: error,
                },
            });
            setError(true);
            console.error("An error occurred during the checkout process:", error);
        }
        setLoading(false);
        onClose();
    };

    return (
        <>
        <ErrorModal error={error} setError={setError} />
        <Button variant="contained" color="secondary" onClick={handleManageBilling} disabled={loading} size="large">
            {loading ? <CircularProgress color="secondary" size={20} /> : "Open Billing"}
        </Button>
        </>
    );
};

export default BillingButton;
