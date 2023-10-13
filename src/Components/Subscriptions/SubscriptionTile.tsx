import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { SubscriptionInfo } from '../../utils/types/SubscriptionInterfaces';
import ProUpgradeButton from './ProCheckout/ProUpgradeButton';
import CreateTeamButton from './TeamCheckout/CreateTeamButton';

interface Props {
    subscriptionInfo: SubscriptionInfo;
    closeDialog: () => void;
}

const SubscriptionTile: React.FC<Props> = ({ subscriptionInfo, closeDialog }) => {
    const theme = useTheme();

    const renderActionButton = () => {
        switch (subscriptionInfo.name) {
            case "STARTER":
                return <Typography variant="h6" fontWeight={'bold'} color="text.primary" sx={{ fontSize: '1.1rem', marginBottom: '15px' }}>
                    Current Subscription
                </Typography>;
            case "PRO":
                return <ProUpgradeButton closeDialog={closeDialog} />;
            case "TEAM":
                return <CreateTeamButton closeDialog={closeDialog} />;
            default:
                return null;
        }
    };

    return (
        <Box
            sx={{
                width: '240px',
                height: '300px',
                borderRadius: '15px',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: theme.palette.primary.main,
                background: theme.palette.secondary.main,
            }}
        >
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary.main">{subscriptionInfo.name}</Typography>
                <Typography variant="h6" color="text.primary">{subscriptionInfo.monthlyPrice}</Typography>
            </Box>
            <Box sx={{ overflow: 'auto', maxHeight: '120px' }}>
                {subscriptionInfo.features.map((feature, index) => (
                    <Typography
                        variant="body1"
                        color="text.primary"
                        key={index}
                        sx={{ fontSize: '1.1rem', marginBottom: '15px' }} // Adjust this value for desired size
                    >
                        - {feature}
                    </Typography>
                ))}
            </Box>
            {renderActionButton()}
        </Box>
    );
};

export default SubscriptionTile;
