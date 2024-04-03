import { useState } from "react";
import { Button, Modal, Typography, Spin, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { deleteInviteToOrg, getOrganizationMembers } from "../../../utils/api/org-api";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import { Invite, OrganizationMembers } from "../../../utils/types/OrganizationInterfaces";

const { Text } = Typography;

interface DeleteInviteButtonProps {
    invite: Invite;
    setMembers: (members: any) => void;
    setInvites: (invites: any) => void;
}

const DeleteInviteButton = ({ invite, setMembers, setInvites }: DeleteInviteButtonProps) => {
    const { getAccessToken } = useAuth0User();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    const handleDeleteInvite = () => {
        setIsModalVisible(true);
        setError(null);
        setSuccess(false);
    };

    const handleConfirmDeleteInvite = async () => {
        const token = await getAccessToken();
        if (!token) return;

        try {
            setDeleteLoading(true);
            await deleteInviteToOrg(token, invite.id);

            const fetchedMembers = await getOrganizationMembers(token) as OrganizationMembers;
            setMembers(fetchedMembers.members.data);
            setInvites(fetchedMembers.invites.data);

            setSuccess(true);
        } catch (err) {
            setError("An error occurred while deleting the invite. Please try again.");
        }

        setDeleteLoading(false);
        setIsModalVisible(false);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button onClick={handleDeleteInvite} type="link" icon={<CloseCircleOutlined />} />
            <Modal
                title="Confirm Removal"
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="cancel" onClick={handleCloseModal}>
                        Cancel
                    </Button>,
                    <Button key="remove" type="primary" danger onClick={handleConfirmDeleteInvite} disabled={deleteLoading}>
                        {deleteLoading ? <Spin /> : "Confirm"}
                    </Button>,
                ]}
            >
                <Space direction="vertical">
                    <Text>
                        Are you sure you want to delete invite to {invite.invitee.email} to join the organization?
                    </Text>
                    {error && <Text type="danger">{error}</Text>}
                    {success && <Text type="success">Invite deleted successfully!</Text>}
                </Space>
            </Modal>
        </>
    );
};

export default DeleteInviteButton;