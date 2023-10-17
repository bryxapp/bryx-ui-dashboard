import { useState } from 'react';
import { useTheme, Chip } from '@mui/material';
import UpgradeSubscriptionDialog from '../../../Subscriptions/UpgradeSubscriptionDialog';
import { SubscriptionEnum } from '../../../../utils/types/SubscriptionInterfaces';
import { CircularProgress } from '@mui/material';
import { useBryxUserContext } from '../../../../utils/contexts/BryxUserContext';

const Subscription = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { bryxUser } = useBryxUserContext();
    const isTeam = bryxUser?.subscription && bryxUser?.subscription === SubscriptionEnum.TEAM;


    const handleClick = () => {
        if (!isTeam) {
            setOpen(true);
        }
    };

    return (
        <>
            <Chip
                label={bryxUser?.subscription ? bryxUser?.subscription : <CircularProgress color="secondary" size={20} />}
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