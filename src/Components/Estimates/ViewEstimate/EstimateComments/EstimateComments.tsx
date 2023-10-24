import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import EstimateComment from './EstimateComment/EstimateComment';
import { createEstimateComment, getEstimateComments } from '../../../../utils/api/estimate-comments-api';
import { StyledTextField as TextField } from '../../../SharedComponents/TextField/TextField'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import { Typography } from '@mui/material';
import { EstimateCommentData, EstimateData } from '../../../../utils/types/EstimateInterfaces';
import ErrorMessage from '../../../SharedComponents/ErrorMessage/ErrorMessage';
import logger from '../../../../logging/logger';

interface EstimateCommentsProps {
    estimate: EstimateData|null;
}

const EstimateComments = ({ estimate }: EstimateCommentsProps) => {
    const [newComment, setNewComment] = useState('');
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [snackBarText, setSnackBarText] = useState('');
    const { auth0User, getAccessToken } = useAuth0User();
    const [estimateComments, setEstimateComments] = useState<any[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEstimateComments = async () => {
            if (!estimate ) return
                const token = await getAccessToken();
                if (!token) return;
                try {
                    const fetchedEstimateComments = await getEstimateComments(estimate.id, token)
                    setEstimateComments(fetchedEstimateComments);
                    setLoading(false);
                }
                catch {
                    logger.trackException({
                        properties: {
                            name: "Estimate Comments Error",
                            page: "Estimate Comments",
                            description: "Error fetching estimate comments",
                        },
                    });
                    setError(true);
                    setLoading(false);
                }
        }
        fetchEstimateComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [estimate, auth0User?.sub]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    const handleAddComment = async () => {
        if (!estimate) return;
        if (newComment.trim() === '') {
            return;
        }
        const token = await getAccessToken()
        if (!token) return;
        const userPic = auth0User?.picture || '';
        try {
            let userName = "Unknown User"
            if (auth0User?.name) {
                userName = auth0User.name;
            } else if (auth0User?.nickname) {
                userName = auth0User.nickname;
            }
            else if (auth0User?.email) {
                userName = auth0User.email;
            }
            const createdEstimateComment = await createEstimateComment(userName, estimate.id, newComment, userPic, token);
            setEstimateComments((prevComments: EstimateCommentData[]) => [createdEstimateComment, ...prevComments]);
            setNewComment('');
        } catch {
            logger.trackException({
                properties: {
                    name: "Estimate Comments Error",
                    page: "Estimate Comments",
                    description: "Error adding comment",
                },
            });
            //Show a Snackbar message
            setSnackBarText('Error adding comment');
            setSnackbarOpen(true);
        }
    };

    if (error) return <ErrorMessage dataName='comments' />;

    return (
        <>
            <List>
                {!loading && estimateComments.slice().reverse().map((estimateComment: EstimateCommentData) => (
                    <EstimateComment
                        key={estimateComment.id}
                        estimateComment={estimateComment}
                        setEstimateComments={setEstimateComments}
                        setSnackBarText={setSnackBarText}
                        setSnackbarOpen={setSnackbarOpen}
                    />
                ))}
                {loading && <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: 'primary' }}> Loading comments... </Typography>}
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
