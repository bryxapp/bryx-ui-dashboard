import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LinkIcon from "@mui/icons-material/Link"
import ClipBoardIcon from "@mui/icons-material/ContentPaste"
import styled from "@emotion/styled";
import Link from '../../../SharedComponents/Link/Link'

const EstimateButton = styled(Button)`
    margin-right: 10px;
`;

interface EstimateShareBarProps {
    estimate: any;
}

const EstimateShareBar = ({ estimate }: EstimateShareBarProps) => {

    const handleLinkClick = () => {
        //Copy to clipboard
        navigator.clipboard.writeText(estimate?.estimatePdfUrl || '');
    };

    return (
        <div>
            <Tooltip title="Open in new tab">
                <Link to={estimate?.estimatePdfUrl} target="_blank">
                    <EstimateButton variant="contained" color="primary">
                        <LinkIcon />
                    </EstimateButton>
                </Link>
            </Tooltip>
            <Tooltip title="Copy link to clipboard">
                <EstimateButton variant="contained" color="primary" onClick={handleLinkClick}>
                    <ClipBoardIcon />
                </EstimateButton>
            </Tooltip>
        </div>
    );
}

export default EstimateShareBar;
