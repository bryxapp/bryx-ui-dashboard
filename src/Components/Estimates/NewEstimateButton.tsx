import { Button, Tooltip } from 'antd';
import logger from '../../logging/logger';
import { useNavigate } from 'react-router-dom';
import { useAuth0User } from '../../utils/customHooks/useAuth0User';

interface NewEstimateButtonProps {
    maxEstimatesReached: boolean;
}

const NewEstimateButton = ({ maxEstimatesReached }: NewEstimateButtonProps) => {
    const { auth0User } = useAuth0User();
    const navigate = useNavigate();

    const handleNewEstimateClick = () => {
        logger.trackEvent({
            name: 'New Estimate Click',
            properties: { menu: 'New Estimate', user: auth0User?.name, environment: process.env.NODE_ENV },
        });
        navigate('/select-template');
    };

    const tooltipTitle = maxEstimatesReached 
        ? 'Maximum number of estimates reached'
        : 'Create a new estimate';

    return (
        <Tooltip title={tooltipTitle}>
            <Button
                type="primary"
                size="large"
                style={{ borderRadius: 1 }}
                onClick={handleNewEstimateClick}
                disabled={maxEstimatesReached}
            >
                + New Estimate
            </Button>
        </Tooltip>
    );
};

export default NewEstimateButton;
