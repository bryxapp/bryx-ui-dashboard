import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import LinkIcon from "@mui/icons-material/Link"
import ClipBoardIcon from "@mui/icons-material/ContentPaste"
import ShareIcon from "@mui/icons-material/IosShare"
import styled from "@emotion/styled";

const EstimateButton = styled(Button)`
    margin-right: 10px;
`;

interface EstimateShareBarProps {
    estimate: any;
}

const EstimateShareBar = ({ estimate }: EstimateShareBarProps) => {

    const handleShareClick = () => {
        const subject = `Estimate: ${estimate?.estimateName}`;
        const body = `Hi,\n\nPlease find link below for your estimate ${estimate?.estimateName}. \n\n${estimate?.estimatePdfUrl}\n\nBest Regards,\n\n`;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&attachment=${encodeURIComponent(estimate?.estimatePdfUrl || '')}`;
        window.location.href = mailtoLink;
    };

    const handleLinkClick = () => {
        //Copy to clipboard
        navigator.clipboard.writeText(estimate?.estimatePdfUrl || '');
    };

    return (
        <div>
            <Tooltip title="Share via email">
                <EstimateButton variant="contained" color="primary" onClick={handleShareClick}>
                    <ShareIcon />
                </EstimateButton>
            </Tooltip>
            <Tooltip title="Open in new tab">
                <Link href={estimate?.estimatePdfUrl} target="_blank">
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
