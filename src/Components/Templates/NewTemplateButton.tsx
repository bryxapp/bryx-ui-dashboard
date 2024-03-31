import logger from "../../logging/logger";
import { useNavigate } from "react-router-dom";
import { useAuth0User } from "../../utils/customHooks/useAuth0User";
import { Button, Tooltip } from "antd";

interface NewTemplateButtonProps {
    maxTemplatesReached: boolean;
}

const NewTemplateButton = ({ maxTemplatesReached }: NewTemplateButtonProps) => {
    const { auth0User } = useAuth0User();
    const navigate = useNavigate();

    const handleNewTemplateClick = () => {

        logger.trackEvent({
            name: 'New Template Click',
            properties: { menu: 'New Template', user: auth0User?.sub, environment: process.env.NODE_ENV },
        });
        navigate("/choose-canvas-starter")
    };

    const tooltipTitle = maxTemplatesReached
        ? "Maximum number of templates reached"
        : "Create a new template";

    return (
        <Tooltip title={tooltipTitle}>
            <Button
                onClick={handleNewTemplateClick}
                type="primary"
                disabled={maxTemplatesReached}
                size="large"
            >
                + New Template
            </Button>
        </Tooltip>
    );
};

export default NewTemplateButton;
