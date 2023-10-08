import React from 'react';
import { Box, Typography, useTheme, Button } from '@mui/material';

interface Subscription {
    id: string;
    name: string;
    monthlyPrice: string;
    features: string[];
}

interface Props {
    subscriptionInfo: Subscription;
    currentSubscription: string | null;
}

const SubscriptionTile: React.FC<Props> = ({ subscriptionInfo, currentSubscription }) => {
    const theme = useTheme();
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
                        sx={{ fontSize: '1.1rem', marginBottom:'15px' }} // Adjust this value for desired size
                    >
                        - {feature}
                    </Typography>
                ))}
            </Box>
            {currentSubscription?.toLowerCase() === subscriptionInfo.name.toLowerCase() ? (
                <Button variant="contained" color="primary" size="medium" disabled>
                    Current Subscription
                </Button>
            ) : <Button variant="contained" color="primary" size="large">
                Upgrade
            </Button>}

        </Box>
    );
};

export default SubscriptionTile;
