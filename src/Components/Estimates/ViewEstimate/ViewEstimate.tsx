import { useState, useEffect } from "react";
import { Button, Link, Typography } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link"
import ClipBoardIcon from "@mui/icons-material/CopyAll"
import EmailIcon from "@mui/icons-material/Email"
import { useLocation } from 'react-router-dom';
import { getEstimate } from "../../../utils/estimates-api";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";
import Loading from "../../SharedComponents/Loading/Loading";


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
        const link = estimate?.estimatePdfUrl;
        console.log(link)
    };

    return (
        <div>
            <Typography variant="h3" color="primary">
                Name: {estimate?.estimateName}
            </Typography>
            <div style={{ height: 20 }}></div>
            <div>
                <Button variant="contained" color="primary" onClick={handleShareClick}><EmailIcon /></Button>
                <Link href={estimate?.estimatePdfUrl} target="_blank"><Button variant="contained" color="primary"> <LinkIcon /></Button>
                </Link>
                <Button variant="contained" color="primary" onClick={handleLinkClick}> <ClipBoardIcon /> </Button>
            </div>
            <div style={{ height: 20 }}></div>
            <div>
                <iframe src={estimate?.estimatePdfUrl} width="100%" height="900" title="PDF"></iframe>
            </div>
        </div>
    );
}

export default ViewEstimate;
