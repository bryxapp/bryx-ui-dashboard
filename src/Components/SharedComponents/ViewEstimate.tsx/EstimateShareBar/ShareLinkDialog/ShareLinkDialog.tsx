import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Typography,
    useTheme,
    IconButton,
    Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import CheckIcon from '@mui/icons-material/Check';
import { EstimateData } from '../../../../../utils/types/EstimateInterfaces';


interface Props {
    estimate: EstimateData;
    open: boolean;
    onClose: () => void;
}

const ShareLinkDialog: React.FC<Props> = ({ estimate, open, onClose }) => {
    const theme = useTheme();
    const [showCheckMark, setShowCheckMark] = useState(false);
    const CopyLinkBaseURL = "https://dashboard.bryxbids.com/view/?estimateId="

    const handleLinkClick = () => {
        if (estimate.id === undefined) {
            console.log("Estimate ID is undefined")
        }
        else {
            //Copy to clipboard
            navigator.clipboard.writeText(CopyLinkBaseURL + estimate.id);
            setShowCheckMark(true);
            setTimeout(() => setShowCheckMark(false), 1500);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="copyLink-dialog-title"
            fullWidth
            maxWidth="md"
        >
            <DialogTitle
                id="copyLink-dialog-title"
                sx={{
                    background: theme.palette.primary.main,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center', // Align the close icon vertically
                }}
            >
                <Typography variant="h4" color="secondary.main">
                    Link to '{estimate.estimateName}' created
                </Typography>
                <IconButton
                    edge="end"
                    color="secondary"
                    onClick={onClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{ background: theme.palette.primary.main }}>
                <Box
                    sx={{
                        padding: '10px',
                        borderRadius: '5px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{
                        background: theme.palette.primary.light,
                        padding: '10px',
                        marginRight: '10px',
                    }}>
                        <Typography
                            variant="h6"
                            color="secondary.main"
                            sx={{ marginRight: '10px' }}
                        >
                            {CopyLinkBaseURL + estimate.id}
                        </Typography>
                    </Box>
                    <Box sx={{ background: theme.palette.primary.light }} >
                        <Button
                            variant="contained"
                            color='secondary'
                            onClick={handleLinkClick}
                            sx={{
                                minWidth: '150px', // Set a fixed minimum width
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {showCheckMark ? (
                                    <Typography variant="h6" color="primary.main">
                                        Copied <CheckIcon sx={{ marginLeft: '5px' }} />
                                    </Typography>
                                ) : (
                                    <Typography variant="h6" color="primary.main">
                                        Copy
                                    </Typography>
                                )}
                            </Box>
                        </Button>

                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ShareLinkDialog;
