import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    useTheme,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import SubscriptionTile from './SubscriptionTile';
import {
    SubscriptionEnum,
    SubscriptionInfo,
    proSubscription,
    starterSubscription,
    teamSubscription,
} from '../../utils/types/SubscriptionInterfaces';
import { useBryxUserContext } from '../../utils/contexts/BryxUserContext';
import BillingButton from './Billing/Billing';
import { useOrganizationContext } from '../../utils/contexts/OrganizationContext';

interface Props {
    open: boolean;
    onClose: () => void;
}

const packages: SubscriptionInfo[] = [
    starterSubscription,
    proSubscription,
    teamSubscription,
];

const UpgradeSubscriptionDialog: React.FC<Props> = ({ open, onClose }) => {
    const theme = useTheme();
    const { bryxUser } = useBryxUserContext();
    const { isOwner } = useOrganizationContext();

    const getContent = () => {
        if (bryxUser?.subscription === SubscriptionEnum.STARTER || !bryxUser?.subscription) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', overflowX: 'auto' }}>
                    {packages.map((pkg, index) => (
                        <Box sx={{ minWidth: '220px', marginRight: index === packages.length - 1 ? 0 : '15px' }} key={pkg.name}>
                            <SubscriptionTile subscriptionInfo={pkg} closeDialog={onClose} />
                        </Box>
                    ))}
                </Box>
            );
        }

        if (bryxUser?.subscription === SubscriptionEnum.PRO) {
            return (
                <>
                    <Typography variant='h6' color="secondary.main">You are currently subscribed to the Pro plan. To create a new Team plan, simply click the button below.</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'nowrap', overflowX: 'auto' }}>
                        <SubscriptionTile subscriptionInfo={teamSubscription} closeDialog={onClose} />
                    </Box>
                    <br />
                    <Typography variant='h6' color="secondary.main">To manage your billing, click the button below.</Typography>
                    <br />
                    <BillingButton onClose={onClose} />
                </>
            );
        }

        if (bryxUser?.subscription === SubscriptionEnum.TEAM) {
            return <>
                <Typography variant='h6' color="secondary.main">You have a team subscription.</Typography>

                {isOwner &&
                    (<>
                        <Typography variant='h6' color="secondary.main">To manage your billing, click the button below.</Typography>
                        <br />
                        <BillingButton onClose={onClose} />
                    </>)}
            </>;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="subscription-dialog-title"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                id="subscription-dialog-title"
                sx={{
                    background: theme.palette.primary.main,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center', // Align the close icon vertically
                }}
            >
                <Typography variant="h4" color="secondary.main">
                    Upgrade Subscription
                </Typography>
                <IconButton
                    edge="end"
                    color="secondary"
                    onClick={onClose}
                    aria-label="close"
                >
                    <CloseIcon /> {/* Close icon (X) */}
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ background: theme.palette.primary.main }}>
                {getContent()}
            </DialogContent>
        </Dialog>
    );
};

export default UpgradeSubscriptionDialog;
