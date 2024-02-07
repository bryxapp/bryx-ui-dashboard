import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { TemplateData } from '../../../../../utils/types/TemplateInterfaces';
import { useTheme } from '@mui/material';

interface TemplateDeleteDialogProps {
    template: TemplateData;
    handleTemplateCopy: any;
    open: boolean;
    setOpen: any;
}

const TemplateCopyDialog = ({ template, handleTemplateCopy, open, setOpen }: TemplateDeleteDialogProps) => {
    const theme = useTheme();

    const handleConfirmCopy = () => {
        handleTemplateCopy(template.id);
        setOpen(false);
    };

    const handleCancelCopy = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleCancelCopy}>
            <DialogTitle>Delete Template</DialogTitle>
            <Typography color={theme.palette.text.primary} variant="body1" component="div" sx={{ flexGrow: 1, padding: 2 }}>
                Do you want to make a copy of this template?
            </Typography>
            <DialogActions>
                <Button onClick={handleCancelCopy}>Cancel</Button>
                <Button onClick={handleConfirmCopy}>Copy</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TemplateCopyDialog;
