import React from 'react';
import { Card, Typography, Button } from 'antd';
import { SubscriptionEnum, SubscriptionInfo } from '../../utils/types/SubscriptionInterfaces';
import ProUpgradeButton from './ProCheckout/ProUpgradeButton';
import CreateTeamButton from './TeamCheckout/CreateTeamButton';

const { Meta } = Card;

interface Props {
    subscriptionInfo: SubscriptionInfo;
    currentSubscription: SubscriptionEnum;
    closeDialog: () => void;
}

const SubscriptionTile: React.FC<Props> = ({ subscriptionInfo, currentSubscription, closeDialog }) => {

    const renderActionButton = () => {
        switch (subscriptionInfo.name) {
            case "STARTER":
                if (currentSubscription === SubscriptionEnum.STARTER) {
                    return (
                        <Button type="primary" size="large" disabled>
                            Current Subscription
                        </Button>
                    )
                }
                return null;
            case "PRO":
                if (currentSubscription === SubscriptionEnum.PRO) {
                    return (
                        <Button type="primary" size="large" disabled>
                            Current Subscription
                        </Button>
                    )
                }
                return <ProUpgradeButton closeDialog={closeDialog} />
            case "TEAM":
                return <CreateTeamButton closeDialog={closeDialog} />;
            default:
                return null;
        }
    };

    return (
        <div
            key={subscriptionInfo.name}
            style={{ marginBottom: '20px' }}
        >
            <Card
                title={subscriptionInfo.name}
                style={{ height: "16rem" }}
            >
                <Meta
                    title={<Typography>${subscriptionInfo.monthlyPriceInt} /mo</Typography>}
                    description={
                        <>
                            {subscriptionInfo.features.map((line, index) => (
                                <Typography>
                                    {line}
                                </Typography>
                            ))}

                        </>
                    }
                />
                <br />
                {renderActionButton()}
            </Card>
        </div>
    );
};

export default SubscriptionTile;
