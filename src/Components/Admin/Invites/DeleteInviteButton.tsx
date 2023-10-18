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
import { deleteInviteToOrg, getOrganizationMembers } from "../../../utils/api/org-api";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import { Invite, OrganizationMembers } from "../../../utils/types/OrganizationInterfaces";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface DeleteInviteButtonProps {
    invite: Invite;
    setMembers: (members: any) => void;
    setInvites: (invites: any) => void;
}
const DeleteInviteButton = ({ invite, setMembers, setInvites }: DeleteInviteButtonProps) => {
    const { getAccessToken } = useAuth0User();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleDeleteInvite = async () => {
        // Show the confirmation dialog
        setIsDialogOpen(true);
    };

    const handleConfirmDeleteInvite = async () => {

        const token = await getAccessToken();
        if (!token) return;
        await deleteInviteToOrg(token, invite.id);

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
            <IconButton onClick={handleDeleteInvite} color="primary">
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
                        Are you sure you want to delete invite to {invite.invitee.email} to join the organization?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDeleteInvite} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteInviteButton;
