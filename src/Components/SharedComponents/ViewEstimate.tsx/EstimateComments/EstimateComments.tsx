import { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
import EstimateComment from './EstimateComment/EstimateComment';
import { createEstimateComment, getEstimateComments } from '../../../../utils/api/estimate-comments-api';
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import { EstimateCommentData, EstimateData } from '../../../../utils/types/EstimateInterfaces';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import logger from '../../../../logging/logger';
import { Input } from 'antd';
import ErrorModal from '../../ErrorModal/ErrorModal';

interface EstimateCommentsProps {
    estimate: EstimateData | null;
}

const EstimateComments = ({ estimate }: EstimateCommentsProps) => {
    const [newComment, setNewComment] = useState('');
    const { auth0User, getAccessToken } = useAuth0User();
    const [estimateComments, setEstimateComments] = useState<any[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEstimateComments = async () => {
            if (!estimate) return
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


    const handleAddComment = async () => {
        if (!estimate) return;
        if (newComment.trim() === '') {
            return;
        }
        const token = await getAccessToken()
        if (!token) return;
        const userPic = auth0User?.picture || '';
        try {
            setError(false);
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
            setError(true);
        }
    };

    if (error) return <ErrorMessage dataName='comments' />;

    return (
        <>
            {!loading && estimateComments.slice().reverse().map((estimateComment: EstimateCommentData) => (
                <EstimateComment
                    key={estimateComment.id}
                    estimateComment={estimateComment}
                    setEstimateComments={setEstimateComments}
                />
            ))}
            {loading && <Typography.Title level={5}> Loading comments... </Typography.Title>}
            <Input.TextArea
                placeholder='Add a comment...'
                autoSize={{ minRows: 2, maxRows: 6 }}
                style={{ width: '100%' }}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <div style={{ height: '10px' }} />
            <Button type="primary" onClick={handleAddComment}>
                Add Comment
            </Button>
            <ErrorModal error={error} setError={setError} content="Error creating comment" />
        </>
    );
};

export default EstimateComments;
