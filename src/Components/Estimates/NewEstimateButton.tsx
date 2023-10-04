import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import logger from "../../logging/logger";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

interface NewEstimateButtonProps {
    maxEstimatesReached: boolean;
}

const NewEstimateButton = ({ maxEstimatesReached }: NewEstimateButtonProps) => {
    const { user } = useAuth0();
    const navigate = useNavigate();

    const handleNewEstimateClick = () => {
        logger.trackEvent({
            name: 'New Estimate Click',
            properties: { menu: 'New Estimate', user: user?.name, environment: process.env.NODE_ENV },
        });
        navigate('/select-template')
    };

    const tooltipTitle = maxEstimatesReached 
        ? "Maximum number of estimates reached"
        : "Create a new estimate";

    return (
        <Tooltip title={tooltipTitle}>
            <span> {/* span is added because disabled buttons don't trigger tooltips */}
                <Button
                    onClick={handleNewEstimateClick}
                    variant='contained'
                    color='primary'
                    size='large'
                    sx={{ borderRadius: 2 }}
                    disabled={maxEstimatesReached}
                >
                    + New Estimate
                </Button>
            </span>
        </Tooltip>
    );
};

export default NewEstimateButton;
