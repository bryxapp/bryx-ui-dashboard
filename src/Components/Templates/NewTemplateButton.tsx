import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import logger from "../../logging/logger";
import { useAuth0 } from "@auth0/auth0-react";
import { useTheme } from "@mui/material";

interface NewTemplateButtonProps {
    maxTemplatesReached: boolean;
}

const NewTemplateButton = ({ maxTemplatesReached }: NewTemplateButtonProps) => {
    const { user } = useAuth0();
    const theme = useTheme();

    const handleNewTemplateClick = () => {
        logger.trackEvent({
            name: 'New Template Click',
            properties: { menu: 'New Template', user: user?.name, environment: process.env.NODE_ENV },
        });
    };

    const tooltipTitle = maxTemplatesReached
        ? "Maximum number of templates reached"
        : "Create a new template";

    return (
        <Tooltip title={tooltipTitle}>
            <span> {/* span is added because disabled buttons don't trigger tooltips */}
                <Button
                    href="/choose-canvas-starter"
                    onClick={handleNewTemplateClick}
                    variant="contained"
                    size="large"
                    sx={{
                        borderRadius: 2,
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
