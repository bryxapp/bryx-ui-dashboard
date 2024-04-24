import React, { useState } from "react";
import { Button, Modal, Input, Typography, Spin, Space, Alert } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getOrganizationMembers, inviteMemberToOrg } from "../../utils/api/org-api";
import { useAuth0User } from "../../utils/customHooks/useAuth0User";
import { OrganizationMembers } from "../../utils/types/OrganizationInterfaces";

const { Text } = Typography;

interface InviteButtonProps {
    disabled?: boolean;
    setInvites: (invites: any) => void;
    setMembers: (members: any) => void;
}

const InviteButton = ({ disabled, setInvites, setMembers }: InviteButtonProps) => {
    const { getAccessToken } = useAuth0User();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [inviteLoading, setInviteLoading] = useState<boolean>(false);

    const handleInviteUser = () => {
        setIsModalVisible(true);
        setError(null);
        setSuccess(false);
    };

    const handleConfirmInvite = async () => {
        if (!isValidEmail) return;

        const token = await getAccessToken();
        if (!token) return;

        try {
            setInviteLoading(true);
            await inviteMemberToOrg(token, email);

            const fetchedMembers = await getOrganizationMembers(token) as OrganizationMembers;
            setMembers(fetchedMembers.members.data);
            setInvites(fetchedMembers.invites.data);

            setSuccess(true);
            setEmail("");
            setIsValidEmail(true);
        } catch (err) {
            setError("An error occurred while sending the invite. Please try again.");
        }
        setInviteLoading(false);
        setIsModalVisible(false);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredEmail = event.target.value;
        setEmail(enteredEmail);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(enteredEmail));
    };

    return (
        <>
            <Button onClick={handleInviteUser} type="primary" disabled={disabled}>
                <PlusOutlined /> Invite User
            </Button>
            <Modal
                title="Send Invite"
                visible={isModalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="cancel" onClick={handleCloseModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleConfirmInvite} disabled={!isValidEmail || success}>
                        {inviteLoading ? <Spin /> : "Send Invite"}
                    </Button>,
                ]}
            >
                <Space direction="vertical">
                    <Text>
                        Enter the email below of the user you want to invite to join your team.
                    </Text>
                    <Input
                        autoFocus
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={handleEmailChange}
                        allowClear
                        style={{ marginBottom: "10px" }}
                    />
                    {!isValidEmail && <Alert message="Invalid email format" type="error" />}
                    {error && <Alert message="Error sending invite." type="error" />}
                    {success && <Alert message="Invite sent successfully!" type="success" />}
                </Space>
            </Modal>
        </>
    );
};

export default InviteButton;
