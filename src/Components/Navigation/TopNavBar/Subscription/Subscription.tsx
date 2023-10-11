import React, { useState } from 'react';
import { useTheme, Chip } from '@mui/material';
import UpgradeSubscriptionDialog from '../../../Subscriptions/UpgradeSubscriptionDialog';
import { SubscriptionType } from '../../../../utils/types/SubscriptionInterfaces';
interface SubscriptionProps {
    subscription: SubscriptionType
}

const Subscription: React.FC<SubscriptionProps> = ({ subscription }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <>
            <Chip
                clickable={subscription === 'STARTER'}
                label={subscription}
                onClick={()=>setOpen(true)}
                sx={{
                    marginRight: '10px',
                    color: theme.palette.text.secondary,
                    fontWeight: "bold",
                    cursor: subscription === 'STARTER' ? 'pointer' : 'default',
                }}
            />
            <UpgradeSubscriptionDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default Subscription;
