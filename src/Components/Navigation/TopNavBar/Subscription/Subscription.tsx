import { useState } from 'react';
import { useTheme, Chip, CircularProgress } from '@mui/material';
import UpgradeSubscriptionDialog from '../../../Subscriptions/UpgradeSubscriptionDialog';
import { useBryxUserContext } from '../../../../utils/contexts/BryxUserContext';
import { useOrganizationContext } from '../../../../utils/contexts/OrganizationContext';

const Subscription = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const { bryxUser } = useBryxUserContext();
    const { organization } = useOrganizationContext();

    // Function to compute label
    const computeLabel = () => {
        if (!bryxUser?.subscription) {
            return <CircularProgress color="secondary" size={20} />;
        }
        if (bryxUser.subscription === 'TEAM') {
            return `${bryxUser.subscription}: ${organization?.bryxOrg.orgDisplayName}`;
        }
        return bryxUser.subscription;
    };

    const handleClick = () => {
        setOpen(true);
    };

    return (
        <>
            <Chip
                label={computeLabel()}
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