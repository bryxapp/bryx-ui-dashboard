import { useState } from "react";
import { Button, Modal, Typography, Space, message } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { getOrganizationMembers, removeMemberFromOrg } from "../../../utils/api/org-api";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import { Member, OrganizationMembers } from "../../../utils/types/OrganizationInterfaces";

const { Text } = Typography;

interface RemoveMemberButtonProps {
    member: Member;
    setMembers: (members: any) => void;
    setInvites: (invites: any) => void;
}

const RemoveMemberButton = ({ member, setMembers, setInvites }: RemoveMemberButtonProps) => {
    const { getAccessToken } = useAuth0User();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleRemoveMember = () => {
        setIsModalVisible(true);
        setError(null);
        setSuccess(false);
    };

    const handleConfirmRemoveMember = async () => {
        const token = await getAccessToken();
        if (!token) return;

        try {
            await removeMemberFromOrg(token, member.user_id);

            const fetchedMembers = await getOrganizationMembers(token) as OrganizationMembers;
            setMembers(fetchedMembers.members.data);
            setInvites(fetchedMembers.invites.data);

            setSuccess(true);
            message.success("Member removed successfully!");
        } catch (err) {
            setError("An error occurred while removing the member. Please try again.");
        }

        setIsModalVisible(false);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button onClick={handleRemoveMember} type="link" icon={<CloseCircleOutlined />} />
            <Modal
                title="Confirm Removal"
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="cancel" onClick={handleCloseModal}>
                        Cancel
                    </Button>,
                    <Button key="remove" type="primary" danger onClick={handleConfirmRemoveMember}>
                        Confirm
                    </Button>,
                ]}
            >
                <Space direction="vertical">
                    <Text>
                        Are you sure you want to remove member {member.name} from the organization?
                    </Text>
                    {error && <Text type="danger">{error}</Text>}
                    {success && <Text type="success">Member removed successfully!</Text>}
                </Space>
            </Modal>
        </>
    );
};

export default RemoveMemberButton;
