import { Container, Typography } from '@mui/material';
import { SubscriptionInfo } from "../../../utils/types/SubscriptionInterfaces";

interface Props {
    newSubscriptionInfo: SubscriptionInfo;
}

const OrderComplete = ({ newSubscriptionInfo }: Props) => {

    return (
        <Container>
            <Typography variant="h2" color="primary.main">Order Complete</Typography>
            <Typography variant="h6" fontWeight={'bold'} color="text.primary" sx={{ fontSize: '1.1rem', marginBottom: '15px' }}>
                Your subscription has been updated to {newSubscriptionInfo.name}
            </Typography>
            <Typography variant="h4" color="primary.main">You now have access to</Typography>
            {newSubscriptionInfo.features.map((feature, index) => (
                <Typography variant="body1" color="text.primary" key={index}>
                    {feature}
                </Typography>
            ))}
        </Container>
    );
};

export default OrderComplete;