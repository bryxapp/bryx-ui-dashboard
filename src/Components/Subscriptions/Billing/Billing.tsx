import React, { useState } from 'react';
import { Button, Spin, message } from 'antd';
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import { loadStripe } from "@stripe/stripe-js";
import { createBillingSession } from "../../../utils/api/billing-api";
import logger from "../../../logging/logger";

const stripePromise = process.env.REACT_APP_STRIPE_KEY
    ? loadStripe(process.env.REACT_APP_STRIPE_KEY)
    : null;

interface BillingButtonProps {
    onClose: () => void;
}

const BillingButton = ({ onClose }: BillingButtonProps) => {
    const { getAccessToken } = useAuth0User();
    const [loading, setLoading] = useState(false);

    const showError = (content: string) => {
        message.error(content);
    };

    const handleManageBilling = async () => {
        setLoading(true);
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

            // Assuming session.url is directly usable without appending session_id
            window.open(session.url);
        } catch (error) {
            logger.trackException({
                properties: {
                    name: "Billing Error",
                    page: "Billing",
                    description: "Error creating billing session",
                    error: error,
                },
            });
            showError("An error occurred during the billing session creation.");
            console.error("An error occurred during the checkout process:", error);
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <>
            <Button type="primary" onClick={handleManageBilling} disabled={loading} size="large">
                {loading ? <Spin /> : "Manage Billing"}
            </Button>
        </>
    );
};

export default BillingButton;