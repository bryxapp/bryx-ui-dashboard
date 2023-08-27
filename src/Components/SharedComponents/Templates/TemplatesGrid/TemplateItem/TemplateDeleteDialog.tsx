import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { TemplateData } from '../../../../../utils/types/TemplateInterfaces';
import { useTheme } from '@mui/material';

interface TemplateDeleteDialogProps {
    template: TemplateData;
    handleTemplateDelete: any;
    open: boolean;
    setOpen: any;
}

const TemplateDeleteDialog = ({ template, handleTemplateDelete, open, setOpen }: TemplateDeleteDialogProps) => {
    const theme = useTheme();
    const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';


    const handleConfirmDelete = () => {
        handleTemplateDelete(template.id);
        setOpen(false);
    };

    const handleCancelDelete = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleCancelDelete}>
            <DialogTitle>Delete Template</DialogTitle>
            <Typography color={textColor} variant="body1" component="div" sx={{ flexGrow: 1, padding: 2 }}>
                Are you sure you want to permanently delete this template?
            </Typography>
            <DialogActions>
                <Button onClick={handleCancelDelete}>Cancel</Button>
                <Button onClick={handleConfirmDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TemplateDeleteDialog;
