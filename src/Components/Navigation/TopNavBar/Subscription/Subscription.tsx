import { useEffect, useState } from 'react';
import { useTheme, Chip } from '@mui/material';
import UpgradeSubscriptionDialog from '../../../Subscriptions/UpgradeSubscriptionDialog';
import { SubscriptionEnum, SubscriptionType, mapSubscriptionToInfo } from '../../../../utils/types/SubscriptionInterfaces';
import { CircularProgress } from '@mui/material';
import { useSubscriptionContext } from '../../../../utils/contexts/SubscriptionContext';
import { useAccessToken } from '../../../../utils/customHooks/useAccessToken';
import { useOrganizationContext } from '../../../../utils/contexts/OrganizationContext';
import { getUser } from '../../../../utils/api/user-api';

const Subscription = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { subscription, setSubscription } = useSubscriptionContext();
    const { user, getAccessToken } = useAccessToken();
    const isTeam = subscription && subscription.name === SubscriptionEnum.TEAM;
    const { organization } = useOrganizationContext();

    useEffect(() => {
        const fetchSubscription = async () => {
            if (!user || subscription) return;

            if (user.org_id) {
                if (organization) {
                    setSubscription(mapSubscriptionToInfo(organization.bryxOrg.subscription));
                }
            } else {
                const token = await getAccessToken();
                if (!token) return;

                const response = await getUser(token);
                if (!response) throw new Error("Error fetching subscription");

                setSubscription(mapSubscriptionToInfo(response.subscription as SubscriptionType));
            }
        };

        fetchSubscription();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.sub, user?.org_id]);


    const handleClick = () => {
        if (!isTeam) {
            setOpen(true);
        }
    };

    return (
        <>
            <Chip
                label={subscription ? subscription.name : <CircularProgress color="secondary" size={20} />}
                onClick={handleClick}
                sx={{
                    marginRight: '10px',
                    color: theme.palette.text.secondary,
                    fontWeight: "bold",
                    cursor: !isTeam ? 'pointer' : 'default',
                }}
            />
            <UpgradeSubscriptionDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default Subscription;