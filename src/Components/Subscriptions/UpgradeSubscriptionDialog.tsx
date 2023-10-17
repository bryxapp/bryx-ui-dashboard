import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography, useTheme } from '@mui/material';
import SubscriptionTile from './SubscriptionTile';
import { SubscriptionEnum, SubscriptionInfo, proSubscription, starterSubscription, teamSubscription } from '../../utils/types/SubscriptionInterfaces';
import { useBryxUserContext } from '../../utils/contexts/BryxUserContext';

interface Props {
    open: boolean;
    onClose: () => void;
}

const packages: SubscriptionInfo[] = [
    starterSubscription,
    proSubscription,
    teamSubscription
];

const UpgradeSubscriptionDialog: React.FC<Props> = ({ open, onClose }) => {
    const theme = useTheme();
    const { bryxUser } = useBryxUserContext();

    const getContent = () => {
        if (bryxUser?.subscription === SubscriptionEnum.STARTER) {
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
                </>
            );
        }

        if (bryxUser?.subscription === SubscriptionEnum.TEAM) {
            return <Typography>You have a team subscription.</Typography>;
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="subscription-dialog-title" fullWidth maxWidth="md">
            <DialogTitle id="subscription-dialog-title" sx={{ background: theme.palette.primary.main }}>
                <Typography variant="h4" color="secondary.main">
                    Upgrade Subscription
                </Typography>
            </DialogTitle>
            <DialogContent sx={{ background: theme.palette.primary.main }}>
                {getContent()}
            </DialogContent>
            <DialogActions sx={{ background: theme.palette.primary.main }}>
                <Button onClick={onClose} color="secondary">
                    <Typography variant='h6'>
                        Close
                    </Typography>
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpgradeSubscriptionDialog;
