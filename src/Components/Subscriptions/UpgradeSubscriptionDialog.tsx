import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import SubscriptionTile from './SubscriptionTile';
import Box from '@mui/material/Box'; // Import Box component
import { Typography, useTheme } from '@mui/material';

interface Props {
    open: boolean;
    onClose: () => void;
}
interface Subscription {
    id: string;
    name: string;
    monthlyPrice: string;
    features: string[];
    stripeId: string;
}

const packages: Subscription[] = [
    { id: 'starter', name: 'Starter', monthlyPrice: 'Free', features: ['Single user account', 'Create up to 3 Templates', 'Save 10 Estimates'], stripeId: '' },
    { id: 'pro', name: 'Pro', monthlyPrice: '$15/mo', features: ['Single user account', 'Create up to 5 Templates', 'Unlimited Estimates'], stripeId: 'price_1NypfzEjO3JKZRm1Wj1BdyDz' },
    { id: 'team', name: 'Team', monthlyPrice: '$50/mo', features: ['Up to 10 team members', 'Create Unlimited Templates', 'Unlimited Estimates'], stripeId: 'price_1NypgEEjO3JKZRm1JSmm4nSC' }
];

const UpgradeSubscriptionDialog: React.FC<Props> = ({ open, onClose }) => {
    const theme = useTheme();
    const currentSubscription = sessionStorage.getItem('subscription');
    if (currentSubscription?.toLowerCase() === 'starter') {
        return (
            <Dialog open={open} onClose={onClose} aria-labelledby="subscription-dialog-title" fullWidth maxWidth="md"> {/* Set fullWidth and maxWidth */}
                <DialogTitle id="subscription-dialog-title" sx={{ background: theme.palette.primary.main }}>
                    <Typography variant="h4" color="secondary.main">
                        Upgrade Subscription
                    </Typography></DialogTitle>
                <DialogContent sx={{ background: theme.palette.primary.main }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', overflowX: 'auto' }}> {/* Flex container */}
                        {packages.map((pkg) => (
                            <Box sx={{ minWidth: '220px', marginRight: packages.indexOf(pkg) === packages.length - 1 ? 0 : '15px' }}>
                                <SubscriptionTile subscriptionInfo={pkg} key={pkg.id} currentSubscription={currentSubscription} />
                            </Box>
                        ))}
                    </Box>
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
    }
    else {
        return (
            <Dialog open={open} onClose={onClose} aria-labelledby="subscription-dialog-title" fullWidth maxWidth="md"> {/* Set fullWidth and maxWidth */}
                <DialogTitle id="subscription-dialog-title" sx={{ background: theme.palette.primary.main }}>
                    <Typography variant="h4" color="secondary.main">
                        Upgrade Subscription
                    </Typography></DialogTitle>
                <DialogContent sx={{ background: theme.palette.primary.main }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'nowrap', overflowX: 'auto' }}> {/* Flex container */}
                        {currentSubscription?.toLowerCase() === 'pro' &&
                            <Typography>
                                You are already subscribed to the Pro plan.
                            </Typography>
                        }
                        {currentSubscription?.toLowerCase() === 'team' && (
                            <Typography>
                                You have a team subscription.
                            </Typography>
                        )}
                    </Box>
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
    }
};

export default UpgradeSubscriptionDialog;
