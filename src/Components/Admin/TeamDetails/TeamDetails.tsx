import { useState } from 'react';
import {
    Button,
    Modal,
    Typography,
    Tooltip,
    message
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getOrganization, updateOrg } from '../../../utils/api/org-api';
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import { useOrganizationContext } from '../../../utils/contexts/OrganizationContext';
import TeamColorSelector from './TeamColorSelector';
import TeamLogoSelector from './TeamLogoSelector';
import TeamNameEditor from './TeamNameEditor';

const TeamDetails = () => {
    const { organization } = useOrganizationContext();
    const { getAccessToken } = useAuth0User();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState(organization?.bryxOrg.orgDisplayName);
    const [newPrimaryColor, setNewPrimaryColor] = useState(organization?.bryxOrg.branding.primaryColor);
    const [newSecondaryColor, setNewSecondaryColor] = useState(organization?.bryxOrg.branding.secondaryColor);
    const [newLogo, setNewLogo] = useState<File>();
    const [isValidTeamName, setIsValidTeamName] = useState(true);
    const { setOrganization } = useOrganizationContext();

    const handleEditSettings = () => {
        setIsDialogOpen(true);
    };

    const handleConfirmSettingsUpdate = async () => {
        if (!isValidTeamName) return;

        const token = await getAccessToken();
        if (!token || !newTeamName) return;

        try {
            await updateOrg(token, newTeamName, newPrimaryColor?.toString() || '', newSecondaryColor?.toString() || '', newLogo);

            const org = await getOrganization(token);
            setOrganization(org);
            message.success('Team settings updated successfully');
        } catch (err) {
            message.error('Error updating team settings');
        }
        setIsDialogOpen(false);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setNewTeamName(organization?.bryxOrg.orgDisplayName);
        setNewPrimaryColor(organization?.bryxOrg.branding.primaryColor);
        setNewSecondaryColor(organization?.bryxOrg.branding.secondaryColor);
        setNewLogo(undefined);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Typography.Title level={4} style={{ margin: 0 }}>
                    {organization?.bryxOrg.orgDisplayName}
                </Typography.Title>
                <Tooltip title="Edit Team Settings">
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={handleEditSettings}
                    />
                </Tooltip>
            </div>
            <Modal
                title="Edit Team Settings"
                open={isDialogOpen}
                onCancel={handleCloseDialog}
                footer={[
                    <Button key="cancel" onClick={handleCloseDialog}>
                        Cancel
                    </Button>,
                    <Button
                        key="confirm"
                        type="primary"
                        onClick={handleConfirmSettingsUpdate}
                        disabled={!isValidTeamName}
                    >
                        Confirm
                    </Button>
                ]}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <TeamNameEditor newTeamName={newTeamName || ''} setNewTeamName={setNewTeamName} isValidTeamName={isValidTeamName} setIsValidTeamName={setIsValidTeamName} />
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
                        <TeamColorSelector hexColor={newPrimaryColor || ''} setHexColor={setNewPrimaryColor} label="Primary Color" />
                        <TeamColorSelector hexColor={newSecondaryColor || ''} setHexColor={setNewSecondaryColor} label="Secondary Color" />
                    </div>
                    <TeamLogoSelector currentLogoUrl={organization?.bryxOrg.branding.logoUrl} setNewLogo={setNewLogo} />
                </div>
            </Modal>
        </>
    );
};

export default TeamDetails;
