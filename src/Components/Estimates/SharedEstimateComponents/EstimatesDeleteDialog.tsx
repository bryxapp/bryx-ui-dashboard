import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { EstimateData, EstimateDraftData } from '../../../utils/types/EstimateInterfaces';

interface EstimatesDeleteDialogProps {
    setOpen: (open: boolean) => void;
    open: boolean;
    estimate: EstimateData | EstimateDraftData;
    handleEstimateDelete: (estimateId: string) => void;
    itemName: string;
}

const EstimatesDeleteDialog = ({ setOpen, open, estimate, handleEstimateDelete, itemName }: EstimatesDeleteDialogProps) => {
    const theme = useTheme();

    const handleConfirmDelete = () => {
        handleEstimateDelete(estimate.id);
        setOpen(false);
    };

    const handleCancelDelete = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleCancelDelete}>
            <DialogTitle>Delete {itemName}</DialogTitle>
            <Typography
                variant="body1"
                component="div"
                sx={{ flexGrow: 1, padding: 2, color: theme.palette.text.primary }}
            >
                Are you sure you want to permanently delete this {itemName}?
            </Typography>
            <DialogActions>
                <Button onClick={handleCancelDelete}>Cancel</Button>
                <Button onClick={handleConfirmDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EstimatesDeleteDialog;
