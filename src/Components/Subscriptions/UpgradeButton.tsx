import { Button } from "@mui/material";
import { useAccessToken } from "../../utils/customHooks/useAccessToken";
import { createCheckoutSession } from "../../utils/api/checkout-api";
import { SubscriptionInfo } from "../../utils/types/SubscriptionInterfaces";

interface Props {
    closeDialog: () => void;
    subscriptionInfo: SubscriptionInfo;
    stripePromise: any;
}

const UpgradeButton = ({ closeDialog, subscriptionInfo, stripePromise }: Props) => {
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

            const session = await createCheckoutSession(subscriptionInfo.stripeId);
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
            localStorage.setItem('newSubscriptionName', subscriptionInfo.name);
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

export default UpgradeButton;