import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    DialogContentText
} from "@mui/material";
import { getOrganizationMembers, removeMemberFromOrg } from "../../../utils/api/org-api";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import { Member, OrganizationMembers } from "../../../utils/types/OrganizationInterfaces";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface RemoveMemberButtonProps {
    member: Member;
    setMembers: (members: any) => void;
    setInvites: (invites: any) => void;
}
const RemoveMemberButton = ({ member, setMembers, setInvites }: RemoveMemberButtonProps) => {
    const { getAccessToken } = useAuth0User();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleRemoveMember = async () => {
        // Show the confirmation dialog
        setIsDialogOpen(true);
    };

    const handleConfirmRemoveMember = async () => {

        const token = await getAccessToken();
        if (!token) return;
        await removeMemberFromOrg(token, member.user_id);

        const fetchedMembers = await getOrganizationMembers(token) as OrganizationMembers;
        setMembers(fetchedMembers.members.data);
        setInvites(fetchedMembers.invites.data);

        // Close the dialog
        setIsDialogOpen(false);
    };

    const handleCloseDialog = () => {
        // Close the dialog without removing the user
        setIsDialogOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleRemoveMember} color="primary">
                <HighlightOffIcon />
            </IconButton>
            <Dialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove member {member.name} from organization?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmRemoveMember} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RemoveMemberButton;
