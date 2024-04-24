import { useState } from 'react';
import {
    Button,
    Input,
    Modal,
    Typography,
    Tooltip
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getOrganization, renameOrg } from '../../../utils/api/org-api';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import { useOrganizationContext } from '../../../utils/contexts/OrganizationContext';

const { Text } = Typography;

const TeamName = ({ teamName }: any) => {
    const { getAccessToken } = useAuth0User();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState(teamName);
    const [isValidTeamName, setIsValidTeamName] = useState(true);
    const [error, setError] = useState<string | null>(null); // Error state
    const [success, setSuccess] = useState(false); // Success state
    const { setOrganization } = useOrganizationContext();

    const handleEditTeamName = () => {
        // Show the edit dialog
        setIsDialogOpen(true);
        // Reset error and success states
        setError(null);
        setSuccess(false);
    };

    const handleConfirmTeamRename = async () => {
        if (!isValidTeamName) return; // Prevent renaming if the team name is not valid

        const token = await getAccessToken();
        if (!token || !newTeamName) return;

        try {
            await renameOrg(token, newTeamName);

            const org = await getOrganization(token);
            setOrganization(org);

            // Set success state
            setSuccess(true);
        } catch (err) {
            // Set error state
            setError('An error occurred while renaming the team name. Please try again.');
        }

        // Close the dialog
        setIsDialogOpen(false);
    };

    const handleCloseDialog = () => {
        // Close the dialog without renaming
        setNewTeamName(teamName);
        setIsDialogOpen(false);
    };

    const handleTeamNameChange = (event: any) => {
        const enteredTeamName = event.target.value;
        setNewTeamName(enteredTeamName);

        // Validate team name
        setIsValidTeamName(enteredTeamName.length > 0);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Text strong>
                    Team Name: {teamName}
                </Text>
                <Tooltip title="Edit Team Name">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={handleEditTeamName}
                    />
                </Tooltip>
            </div>
            <Modal
                title="Edit Team Name"
                open={isDialogOpen}
                onCancel={handleCloseDialog}
                footer={[
                    <Button key="cancel" onClick={handleCloseDialog}>
                        Cancel
                    </Button>,
                    <Button
                        key="confirm"
                        type="primary"
                        onClick={handleConfirmTeamRename}
                        disabled={!isValidTeamName || success}
                    >
                        Confirm
                    </Button>
                ]}
            >
                <Input
                    autoFocus
                    id="teamName"
                    placeholder="Team Name"
                    value={newTeamName}
                    onChange={handleTeamNameChange}
                    className={!isValidTeamName ? 'ant-input-error' : ''}
                />
                {!isValidTeamName && <Text type="danger">Team Name cannot be empty</Text>}
                {error && <Text type="danger">{error}</Text>}
                {success && <Text type="success">Team name changed successfully!</Text>}
            </Modal>
        </>
    );
};

export default TeamName;

