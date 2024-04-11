import React from 'react';
import { Modal, Typography, Space } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import SubscriptionTile from './SubscriptionTile';
import {
    SubscriptionEnum,
    SubscriptionInfo,
    proSubscription,
    starterSubscription,
    teamSubscription,
} from '../../utils/types/SubscriptionInterfaces';
import { useBryxUserContext } from '../../utils/contexts/BryxUserContext';
import BillingButton from './Billing/Billing';
import { useOrganizationContext } from '../../utils/contexts/OrganizationContext';

interface Props {
    open: boolean;
    onClose: () => void;
}

const { Text, Title } = Typography;

const packages: SubscriptionInfo[] = [
    starterSubscription,
    proSubscription,
    teamSubscription,
];

const UpgradeSubscriptionDialog: React.FC<Props> = ({ open, onClose }) => {
    const { bryxUser } = useBryxUserContext();
    const { isOwner } = useOrganizationContext();

    const getContent = () => {
        if (bryxUser?.subscription === SubscriptionEnum.STARTER || !bryxUser?.subscription) {
            return (
                <Space direction="horizontal" wrap>
                    {packages.map((pkg, index) => (
                        <SubscriptionTile key={pkg.name} subscriptionInfo={pkg} closeDialog={onClose} currentSubscription={SubscriptionEnum.STARTER} />
                    ))}
                </Space>
            );
        }

        if (bryxUser?.subscription === SubscriptionEnum.PRO) {
            return (
                <Space direction="vertical" wrap>
                    <Space direction="horizontal" wrap>
                        {packages.map((pkg, index) => (
                            <SubscriptionTile key={pkg.name} subscriptionInfo={pkg} closeDialog={onClose} currentSubscription={SubscriptionEnum.PRO} />
                        ))}
                    </Space>
                    <BillingButton onClose={onClose} />
                </Space>
            );
        }

        if (bryxUser?.subscription === SubscriptionEnum.TEAM) {
            return (
                <>
                    <Text strong>You have a team subscription.</Text>
                    {isOwner && (
                        <BillingButton onClose={onClose} />
                    )}
                </>
            );
        }
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={800}
            centered
            closeIcon={<CloseOutlined />}
            title={<Title level={4}>Upgrade Subscription</Title>}
        >
            {/* Centered Div */}
            <div style={{ display: "flex", justifyContent: 'center' }}>
                {getContent()}
            </div>
        </Modal>
    );
};

export default UpgradeSubscriptionDialog;