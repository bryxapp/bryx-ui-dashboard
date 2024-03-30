import React, { useState } from 'react';
import { Tag, Spin } from 'antd';
import UpgradeSubscriptionDialog from '../../../Subscriptions/UpgradeSubscriptionDialog';
import { useBryxUserContext } from '../../../../utils/contexts/BryxUserContext';
import { useOrganizationContext } from '../../../../utils/contexts/OrganizationContext';

const Subscription = () => {
    const [open, setOpen] = useState(false);
    const { bryxUser } = useBryxUserContext();
    const { organization } = useOrganizationContext();

    // Function to compute label
    const computeLabel = () => {
        if (!bryxUser?.subscription) {
            return <Spin size="small" />;
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
            <Tag onClick={handleClick} style={{ marginRight: '10px', cursor: 'pointer', fontWeight: "bold" }}>
                {computeLabel()}
            </Tag>
            <UpgradeSubscriptionDialog open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default Subscription;