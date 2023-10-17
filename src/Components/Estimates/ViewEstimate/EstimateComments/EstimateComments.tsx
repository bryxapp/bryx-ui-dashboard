import React, { useState } from 'react';
import List from '@mui/material/List';
import EstimateComment from './EstimateComment/EstimateComment';
import { deleteEstimateComment, createEstimateComment } from '../../../../utils/api/estimate-comments-api';
import { EstimateData } from '../../../../utils/types/EstimateInterfaces';
import { StyledTextField as TextField } from '../../../SharedComponents/TextField/TextField'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import { Typography } from '@mui/material';

interface EstimateCommentsProps {
    estimateId: string;
    estimateComments: any[];
    setEstimateComments: React.Dispatch<React.SetStateAction<any>>;
    commentsError: boolean;
}

const EstimateComments = ({ estimateId, estimateComments, setEstimateComments, commentsError }: EstimateCommentsProps) => {
    const [newComment, setNewComment] = useState('');
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');
    const { auth0User, getAccessToken } = useAuth0User();
    let userName = "Unknown User"
    if (auth0User?.name) {
        userName = auth0User.name;
    } else if (auth0User?.nickname) {
        userName = auth0User.nickname;
    }
    else if (auth0User?.email) {
        userName = auth0User.email;
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleEstimateCommentDelete = (estimateId: string) => {
        getAccessToken().then((token) => {
            if (!token) return;
            deleteEstimateComment(estimateId, token).then(() => {
                setEstimateComments((prevComments: any) =>
                    prevComments.filter((estimate: EstimateData) => estimate.id !== estimateId)
                );
            }).catch
                (() => {
                    //Show a Snackbar message
                    setSnackBarText('Error deleting comment');
                    setSnackbarOpen(true);
                }
                );
        });
    };

    const handleAddComment = async () => {
        if (newComment.trim() === '') {
            return;
        }
        const token = await getAccessToken()
        if (!token) return;
        const userPic = auth0User?.picture || '';
        try {
            const createdEstimateComment = await createEstimateComment(userName, estimateId, newComment, userPic, token);
            setEstimateComments((prevComments: any) => [createdEstimateComment.comment, ...prevComments]);
            setNewComment('');
        } catch {
            //Show a Snackbar message
            setSnackBarText('Error adding comment');
            setSnackbarOpen(true);
        }
    };

    if (commentsError) {
        return <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, color: 'red' }}
        >
            Error loading comments
        </Typography>
    }

    return (
        <>
            <List>
                {estimateComments.slice().reverse().map((estimateComment: any) => (
                    <EstimateComment
                        key={estimateComment.id}
                        estimateComment={estimateComment}
                        userId={auth0User?.sub || ''}
                        handleEstimateCommentDelete={handleEstimateCommentDelete}
                    />
                ))}
            </List>

            <Box mt={3}>
                <TextField
                    label="Add a new comment"
                    variant="outlined"
                    multiline
                    rows={2}
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <div style={{ height: '20px' }} />
                <Button variant="contained" color="primary" onClick={handleAddComment}>
                    Add Comment
                </Button>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isSnackbarOpen}
                message={snackBarText}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            />
        </>
    );
};

export default EstimateComments;
