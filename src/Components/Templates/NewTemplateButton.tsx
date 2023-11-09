import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import logger from "../../logging/logger";
import { useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0User } from "../../utils/customHooks/useAuth0User";

interface NewTemplateButtonProps {
    maxTemplatesReached: boolean;
}

const NewTemplateButton = ({ maxTemplatesReached }: NewTemplateButtonProps) => {
    const { auth0User } = useAuth0User();
    const theme = useTheme();
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
            <span> {/* span is added because disabled buttons don't trigger tooltips */}
                <Button
                    onClick={handleNewTemplateClick}
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: 1,
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.text.secondary,
                    }}
                    disabled={maxTemplatesReached}
                >
                    + New Template
                </Button>
            </span>
        </Tooltip>
    );
};

export default NewTemplateButton;
