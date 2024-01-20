import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import LinkIcon from "@mui/icons-material/Link"
import PDFICON from "@mui/icons-material/PictureAsPdf"
import styled from "@emotion/styled";
import { createEstimatePDF } from "../../../../utils/api/estimates-api";
import ShareLinkDialog from "./ShareLinkDialog/ShareLinkDialog";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


const EstimateButton = styled(Button)`
    margin-right: 10px;
`;
interface EstimateShareBarProps {
    estimate: any;
}

const EstimateShareBar = ({ estimate }: EstimateShareBarProps) => {
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState("");

    const handlePdfClick = async () => {
        if (!estimate) return;
        if (estimate.estimatePdfUrl) {
            window.open(estimate?.estimatePdfUrl, '_blank');
        }
        else if (pdfUrl) {
            window.open(pdfUrl, '_blank');
        }
        else {
            setPdfLoading(true);
            try {
                await createEstimatePDF(estimate).then((res) => {
                    setTimeout(() => {
                    }, 3000);
                    setPdfLoading(false);
                    //wait 2 seconds after api responds

                    if (res.estimatePdfUrl) {
                        setPdfUrl(res.estimatePdfUrl);
                        window.open(res.estimatePdfUrl, '_blank');
                    }
                })
            }
            catch {
                console.log("Error creating PDF")
                setPdfLoading(false);
            }
        }
    };

    const handleOpenShareDialog = () => {
        setShareDialogOpen(true);
    }

    return (
        <div>
            <Tooltip title="Share Link">
                <EstimateButton variant="contained" color="primary" onClick={handleOpenShareDialog}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={30} // Set a fixed width
                        height={24} // Set a fixed height
                    >
                        <LinkIcon />
                    </Box>
                </EstimateButton>
            </Tooltip>
            <Tooltip title="Create a PDF">
                <EstimateButton variant="contained" color="primary" onClick={handlePdfClick}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        width={24} // Set a fixed width
                        height={24} // Set a fixed height
                    >
                        {pdfLoading ? <CircularProgress color="secondary" /> : <PDFICON />}
                    </Box>
                </EstimateButton>
            </Tooltip>
            <ShareLinkDialog estimate={estimate} open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} />
        </div>
    );
}

export default EstimateShareBar;
