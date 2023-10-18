import { useState } from 'react';
import { useTheme, Chip } from '@mui/material';
import UpgradeSubscriptionDialog from '../../../Subscriptions/UpgradeSubscriptionDialog';
import { CircularProgress } from '@mui/material';
import { useBryxUserContext } from '../../../../utils/contexts/BryxUserContext';

const Subscription = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { bryxUser } = useBryxUserContext();

    const handleClick = () => {
        setOpen(true);
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
                }}
            />
            <UpgradeSubscriptionDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default Subscription;