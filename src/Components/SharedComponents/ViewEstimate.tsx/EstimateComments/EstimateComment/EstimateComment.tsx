import { useState } from 'react';
import { convertEpochTime } from '../../../../../utils/time-util';
import { Button, Typography, Avatar, Modal, Card, Space } from 'antd';
import { EstimateCommentData } from '../../../../../utils/types/EstimateInterfaces';
import { useAuth0User } from '../../../../../utils/customHooks/useAuth0User';
import { deleteEstimateComment } from '../../../../../utils/api/estimate-comments-api';
import logger from '../../../../../logging/logger';
import { DeleteOutlined } from '@ant-design/icons';
import ErrorModal from '../../../ErrorModal/ErrorModal';

interface EstimateCommentProps {
    estimateComment: EstimateCommentData;
    setEstimateComments: React.Dispatch<React.SetStateAction<any>>;
}

const EstimateComment = ({ estimateComment, setEstimateComments }: EstimateCommentProps) => {

    const displayDate = estimateComment._ts ? convertEpochTime(estimateComment._ts) : 'Just now'
    const [error, setError] = useState(false);
    const [open, setOpen] = useState(false);
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
            logger.trackException({
                properties: {
                    name: "Estimate Comment Delete Error",
                    page: "Estimate Comments",
                    description: "Error deleting estimate comment",
                    error: error,
                },
            });
            console.error("Failed to delete comment:", error);
            setError(true);
        }
        setOpen(false);
    };


    const handleCancelDelete = () => {
        setOpen(false);
    };

    return (
        <>
            <Card style={{ marginTop: 10, marginBottom: 10, width: "100%" }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ marginBottom: 10, display: 'flex', alignItems: 'flex-start' }}>
                            <Space size={24}>
                                {estimateComment.userPic ? <Avatar size="large" src={estimateComment.userPic} /> : <Avatar>{estimateComment.userName.charAt(0).toUpperCase()}</Avatar>}
                            </Space>
                            <div style={{ marginLeft: 12 }}>
                                <Typography.Title level={5} style={{ margin: 0 }}>{estimateComment.userName}</Typography.Title>
                                <Typography.Text type="secondary">{displayDate}</Typography.Text>
                            </div>
                        </div>
                        <div>
                            <Typography.Text>{estimateComment.comment}</Typography.Text>
                        </div>
                    </div>
                    <div>
                        {estimateComment.userId === auth0User?.sub && (
                            <Button
                                type="text"
                                onClick={handleDeleteClick}
                                icon={<DeleteOutlined />}
                            />
                        )}
                    </div>
                </div>
            </Card>
            <ErrorModal error={error} setError={setError} content="Error deleting comment" />
            <Modal
                title="Delete Comment"
                open={open}
                onCancel={handleCancelDelete}
                footer={[
                    <Button key="back" onClick={handleCancelDelete}>
                        Cancel
                    </Button>,
                    <Button type="primary" danger onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                ]}
            >
                <Typography>
                    Are you sure you want to permanently delete this comment?
                </Typography>
            </Modal>
        </>
    );
};

export default EstimateComment;

