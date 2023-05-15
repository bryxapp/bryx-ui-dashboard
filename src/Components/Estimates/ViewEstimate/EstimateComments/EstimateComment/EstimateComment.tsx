import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemText from '@mui/material/ListItemText';
import { convertEpochTime } from '../../../../../utils/time-util';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';

interface EsEstimateCommentProps {
    estimateComment: any;
    handleEstimateCommentDelete: (estimateCommentId: string) => void;
}

const EstimateComment = ({ estimateComment, handleEstimateCommentDelete }: EsEstimateCommentProps) => {

    const displayDate = estimateComment._ts ? convertEpochTime(estimateComment._ts) : 'Just now'
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const textColor = theme.palette.mode === 'dark' ? 'white' : 'black';
    const avatarLetter = estimateComment.userName.charAt(0).toUpperCase();

    const handleDeleteClick = () => {
        setOpen(true);
    };

    const handleConfirmDelete = () => {
        handleEstimateCommentDelete(estimateComment.id);
        setOpen(false);
    };

    const handleCancelDelete = () => {
        setOpen(false);
    };

    return (
        <ListItem
            secondaryAction={
                <div>
                    <IconButton aria-label="delete" onClick={handleDeleteClick}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            }
            sx={{ alignItems: 'flex-start' }}
        >
            <ListItemAvatar>
                <Avatar>{avatarLetter}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography color={textColor} variant="body1" component="div" sx={{ flexGrow: 1 }}>
                        {estimateComment.userName}
                    </Typography>
                }
                secondary={
                    <>
                        <Typography color={textColor} variant="body2" component="div" sx={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>
                            {estimateComment.comment}
                        </Typography>
                        <Typography color={textColor} variant="body2" component="div" sx={{ flexGrow: 1 }}>
                            {displayDate}
                        </Typography>
                    </>
                }
            />

            <Dialog open={open} onClose={handleCancelDelete}>
                <DialogTitle>Delete Comment</DialogTitle>
                <Typography color={textColor} variant="body1" component="div" sx={{ flexGrow: 1, padding: 2 }}>
                    Are you sure you want to permanently delete this comment?
                </Typography>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleConfirmDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    );
};

export default EstimateComment;
