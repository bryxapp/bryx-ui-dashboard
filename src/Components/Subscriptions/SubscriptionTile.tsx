import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    useTheme,
    Box,
    Grid,
    CardActions,
    Button,
} from '@mui/material';
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
                return <Button variant="outlined" color="primary" disabled>
                    Current Subscription
                </Button >
            case "PRO":
                return <ProUpgradeButton closeDialog={closeDialog} />;
            case "TEAM":
                return <CreateTeamButton closeDialog={closeDialog} />;
            default:
                return null;
        }
    };

    return (
        <Grid
            item
            key={subscriptionInfo.name}
            xs={12}
            sm={subscriptionInfo.name === 'TEAM' ? 12 : 6}
            md={4}
        >
            <Card>
                <CardHeader
                    title={subscriptionInfo.name}
                    titleTypographyProps={{ align: 'center', color: theme.palette.text.secondary }}
                    sx={{
                        backgroundColor: theme.palette.grey[500],
                    }}
                />
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'baseline',
                            mb: 2,
                        }}
                    >
                        <Typography component="h2" variant="h3" color="text.primary">
                            ${subscriptionInfo.monthlyPriceInt}
                        </Typography>
                        <Typography variant="h6" color="text.primary">
                            /mo
                        </Typography>
                    </Box>
                    <ul>
                        {subscriptionInfo.features.map((line) => (
                            <Typography
                                component="li"
                                variant="subtitle1"
                                align="center"
                                key={line}
                            >
                                {line}
                            </Typography>
                        ))}
                    </ul>
                </CardContent>
                <CardActions
                    sx={{
                        justifyContent: 'center',
                    }}
                >
                    {renderActionButton()}
                </CardActions>
            </Card>
        </Grid>
    );
};

export default SubscriptionTile;