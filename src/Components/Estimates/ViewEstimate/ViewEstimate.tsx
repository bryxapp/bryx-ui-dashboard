import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import LinkIcon from "@mui/icons-material/Link"
import ClipBoardIcon from "@mui/icons-material/ContentPaste"
import ShareIcon from "@mui/icons-material/IosShare"
import { useLocation } from 'react-router-dom';
import { getEstimate } from "../../../utils/estimates-api";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";
import Loading from "../../SharedComponents/Loading/Loading";
import styled from "@emotion/styled";


const EstimateButton = styled(Button)`
    margin-right: 10px;
`;

const ViewEstimate = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const estimateId = params.get('estimateId');

    const [estimate, setEstimate] = useState<EstimateData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (estimateId) {
            getEstimate(estimateId)
                .then((res: any) => {
                    setEstimate(res.data);
                    setLoading(false);
                });
        }
        else {
            setLoading(false);
        }
    }, [estimateId]);

    if (loading) {
        return (
            <Loading />
        );
    }

    const handleShareClick = () => {
        const subject = `Estimate: ${estimate?.estimateName}`;
        const body = `Hi,\n\nPlease find attached  the estimate for ${estimate?.estimateName}.\n\nBest regards\n`;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&attachment=${encodeURIComponent(estimate?.estimatePdfUrl || '')}`;
        window.location.href = mailtoLink;
    };

    const handleLinkClick = () => {
        //Copy to clipboard
        navigator.clipboard.writeText(estimate?.estimatePdfUrl || '');
    };

    return (
        <div>
            <Typography variant="h3" color="primary">
                Name: {estimate?.estimateName}
            </Typography>
            <div style={{ height: 20 }}></div>
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
            <div style={{ height: 20 }}></div>
            <div>
                <iframe src={estimate?.estimatePdfUrl} width="100%" height="900" title="PDF"></iframe>
            </div>
        </div>
    );
}

export default ViewEstimate;
