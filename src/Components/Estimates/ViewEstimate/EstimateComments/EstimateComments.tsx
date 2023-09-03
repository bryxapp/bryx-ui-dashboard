import React, { useState } from 'react';
import List from '@mui/material/List';
import EstimateComment from './EstimateComment/EstimateComment';
import { deleteEstimateComment, createEstimateComment } from '../../../../utils/api/estimate-comments-api';
import { EstimateData } from '../../../../utils/types/EstimateInterfaces';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { useAuth0 } from '@auth0/auth0-react';
import { useAccessToken } from '../../../../utils/customHooks/useAccessToken';
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
    const { getAccessToken } = useAccessToken();
    const { user } = useAuth0();
    let userName = "Unknown User"
    if (user?.name) {
        userName = user.name;
    } else if (user?.nickname) {
        userName = user.nickname;
    }
    else if (user?.email) {
        userName = user.email;
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

    const handleAddComment = () => {
        if (newComment.trim() === '') {
            return;
        }
        getAccessToken().then((token) => {
            if (!token) return;
            const userPic = user?.picture || '';
            createEstimateComment(userName, estimateId, newComment, userPic, token)
                .then((res) => {
                    setEstimateComments((prevComments: any) => [res.data.estimateComment, ...prevComments]);
                    setNewComment('');
                })
                .catch(() => {
                    //Show a Snackbar message
                    setSnackBarText('Error adding comment');
                    setSnackbarOpen(true);
                });
        });
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
                        userId={user?.sub || ''}
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
