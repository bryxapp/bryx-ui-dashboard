import React, { useState } from 'react';
import { useTheme, Chip } from '@mui/material';
import UpgradeSubscriptionDialog from '../../../Subscriptions/UpgradeSubscriptionDialog';
interface SubscriptionProps {
    subscription: string | null;
}

const Subscription: React.FC<SubscriptionProps> = ({ subscription }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        if (subscription?.toLowerCase() === 'starter') { setOpen(true); }
    }

    return (
        <>
            <Chip
                clickable={subscription?.toLowerCase() === 'starter' ? true : false}
                label={subscription}
                onClick={handleOpen} // Open the dialog on chip click
                sx={{
                    marginRight: '10px',
                    color: theme.palette.text.secondary,
                    fontWeight: "bold",
                    cursor: "pointer" // To show it's clickable
                }}
            />
            <UpgradeSubscriptionDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default Subscription;
