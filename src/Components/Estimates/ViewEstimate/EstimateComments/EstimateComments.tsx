import React, { useState } from 'react';
import List from '@mui/material/List';
import EstimateComment from './EstimateComment/EstimateComment';
import { deleteEstimateComment, createEstimateComment } from '../../../../utils/estimate-comments-api';
import { EstimateData } from '../../../../utils/types/EstimateInterfaces';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useAuth0 } from '@auth0/auth0-react';

interface EstimateCommentsProps {
    estimateId: string;
    estimateComments: any[];
    setEstimateComments: React.Dispatch<React.SetStateAction<any>>;
    commentsError: boolean;
}

const EstimateComments = ({ estimateId, estimateComments, setEstimateComments, commentsError }: EstimateCommentsProps) => {
    const [newComment, setNewComment] = useState('');
    const { user } = useAuth0();
    const userEmail = user?.email || '';
    const userName = user?.nickname || userEmail;

    const handleEstimateCommentDelete = (estimateId: string) => {
        deleteEstimateComment(estimateId).then(() => {
            setEstimateComments((prevComments: any) =>
                prevComments.filter((estimate: EstimateData) => estimate.id !== estimateId)
            );
        });
    };

    const handleAddComment = () => {
        if (newComment.trim() === '') {
            return;
        }
        createEstimateComment(userEmail, userName, estimateId, newComment)
            .then((res) => {
                setEstimateComments((prevComments: any) => [res.data.estimateComment, ...prevComments]);
                setNewComment('');
            })
            .catch(() => {
                // Handle error if adding comment fails
            });
    };

    if (commentsError) {
        return <div>There was an error loading the comments</div>;
    }

    return (
        <>
            <List>
                {estimateComments.slice().reverse().map((estimateComment: any) => (
                    <EstimateComment
                        key={estimateComment.id}
                        estimateComment={estimateComment}
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
        </>
    );
};

export default EstimateComments;
