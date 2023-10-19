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
import Box from '@mui/material/Box';
import { EstimateCommentData } from '../../../../../utils/types/EstimateInterfaces';
import { useAuth0User } from '../../../../../utils/customHooks/useAuth0User';
import { deleteEstimateComment } from '../../../../../utils/api/estimate-comments-api';

interface EstimateCommentProps {
    estimateComment: EstimateCommentData;
    setEstimateComments: React.Dispatch<React.SetStateAction<any>>;
    setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setSnackBarText: React.Dispatch<React.SetStateAction<string>>;
}

const EstimateComment = ({ estimateComment, setEstimateComments, setSnackBarText, setSnackbarOpen }: EstimateCommentProps) => {

    const displayDate = estimateComment._ts ? convertEpochTime(estimateComment._ts) : 'Just now'
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const { auth0User, getAccessToken } = useAuth0User();


    const handleDeleteClick = () => {
        setOpen(true);
    };

    const handleConfirmDelete = async () => {
        const token = await getAccessToken();
        if (!token) return;
        try {
            await deleteEstimateComment(estimateComment.id, token)
            setEstimateComments((prevComments: any) =>
                prevComments.filter((comment: any) => comment.id !== estimateComment.id)
            );
        } catch (error) {
            console.error("Failed to delete comment:", error);
            setSnackBarText('Error deleting comment');
            setSnackbarOpen(true);
        }
        setOpen(false);
    };


    const handleCancelDelete = () => {
        setOpen(false);
    };

    return (
        <ListItem
            secondaryAction={
                <div>
                    {estimateComment.userId === auth0User?.sub &&
                        <IconButton aria-label="delete" onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>}
                </div>
            }
            sx={{ alignItems: 'flex-start' }}
        >
            <ListItemAvatar>
                {estimateComment.userPic ? <Avatar src={estimateComment.userPic} /> : <Avatar>{estimateComment.userName.charAt(0).toUpperCase()}</Avatar>}
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography color={theme.palette.text.primary} variant="body1" component="span" sx={{ flexGrow: 1 }}>
                        {estimateComment.userName}
                    </Typography>
                }
                secondary={
                    <>
                        <Typography color={theme.palette.text.primary} variant="body2" component="span" sx={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>
                            {estimateComment.comment}
                        </Typography>
                        <Box height="5px" />
                        <Typography color={theme.palette.text.primary} variant="body2" component="span" sx={{ flexGrow: 1 }}>
                            {displayDate}
                        </Typography>
                    </>
                }
            />
            <Dialog open={open} onClose={handleCancelDelete}>
                <DialogTitle>Delete Comment</DialogTitle>
                <Typography color={theme.palette.text.primary} variant="body1" component="div" sx={{ flexGrow: 1, padding: 2 }}>
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

