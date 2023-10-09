import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Button from '@mui/material/Button';


export default function ErrorDialog({ open, setOpen }: any) {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="error-dialog-title"
            aria-describedby="error-dialog-description"
        >
            <DialogTitle id="error-dialog-title">{"Error"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="error-dialog-description" sx={{ color: 'red' }}>
                    There was an issue processing your request. Please try again later.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}
