import { useState } from 'react';
import { Spin, Button } from 'antd';
import UpgradeSubscriptionDialog from '../../../Subscriptions/UpgradeSubscriptionDialog';
import { useBryxUserContext } from '../../../../utils/contexts/BryxUserContext';

const Subscription = () => {
    const [open, setOpen] = useState(false);
    const { bryxUser } = useBryxUserContext();

    // Function to compute label
    const computeLabel = () => {
        if (!bryxUser?.subscription) {
            return <Spin size="small" />;
        }
        if (bryxUser.subscription === 'STARTER') {
            return `Upgrade your subscription`;
        }
        return `Subscription: ${bryxUser.subscription}`;
    };

    const handleClick = () => {
        setOpen(true);
    };

    return (
        <>
            <Button 
            onClick={handleClick}
             size="large" 
             type = "link"
             style={{ 
                width: 200, 
                whiteSpace: 'normal', 
                overflow: 'visible',
                textAlign: 'center'  // Adjust text alignment if necessary
            }}>
                <strong>{computeLabel()}</strong>
            </Button>
            <UpgradeSubscriptionDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default Subscription;