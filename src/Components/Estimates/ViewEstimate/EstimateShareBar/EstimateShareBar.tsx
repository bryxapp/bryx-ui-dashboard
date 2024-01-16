import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LinkIcon from "@mui/icons-material/Link"
import ClipBoardIcon from "@mui/icons-material/ContentPaste"
import PDFICON from "@mui/icons-material/PictureAsPdf"
import styled from "@emotion/styled";
import Link from '../../../SharedComponents/Link/Link'
import { createEstimatePDF } from "../../../../utils/api/estimates-api";
import { useAuth0User } from "../../../../utils/customHooks/useAuth0User";

const URL = "https://dashboard.bryxbids.com/view/?estimateId="
const EstimateButton = styled(Button)`
    margin-right: 10px;
`;

interface EstimateShareBarProps {
    estimate: any;
}

const EstimateShareBar = ({ estimate }: EstimateShareBarProps) => {
    const { getAccessToken } = useAuth0User();

    const handleLinkClick = () => {
        //Copy to clipboard
        navigator.clipboard.writeText(estimate?.id || '');
    };

    const handlePdfClick = async () => {
        if (!estimate) return;
        if (estimate.estimatePdfUrl) {
            window.open(estimate?.estimatePdfUrl, '_blank');
        }
        else {
            const token = await getAccessToken()
            if (!token) return;
            await createEstimatePDF(estimate, token).then((res) => {
                if (res.estimatePdfUrl) {
                    window.open(res.estimatePdfUrl, '_blank');
                }
            })
        }
    };

    return (
        <div>
            <Link to={URL + estimate?.id} target="_blank">
                <Tooltip title="Open in new tab">
                    <EstimateButton variant="contained" color="primary">
                        <LinkIcon />
                    </EstimateButton>
                </Tooltip>
            </Link>
            <Tooltip title="Copy link to clipboard">
                <EstimateButton variant="contained" color="primary" onClick={handleLinkClick}>
                    <ClipBoardIcon />
                </EstimateButton>
            </Tooltip>
            <Tooltip title="Open as PDF">
                <EstimateButton variant="contained" color="primary" onClick={handlePdfClick}>
                    <PDFICON />
                </EstimateButton>
            </Tooltip>
        </div>
    );
}

export default EstimateShareBar;
