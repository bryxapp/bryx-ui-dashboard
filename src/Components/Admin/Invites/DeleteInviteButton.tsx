import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    DialogContentText,
    useTheme
} from "@mui/material";
import { deleteInviteToOrg, getOrganizationMembers } from "../../../utils/api/org-api";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import { Invite, OrganizationMembers } from "../../../utils/types/OrganizationInterfaces";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CircularProgress from "@mui/material/CircularProgress";

interface DeleteInviteButtonProps {
    invite: Invite;
    setMembers: (members: any) => void;
    setInvites: (invites: any) => void;
}

const DeleteInviteButton = ({ invite, setMembers, setInvites }: DeleteInviteButtonProps) => {
    const { getAccessToken } = useAuth0User();
    const theme = useTheme();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [error, setError] = useState<string | null>(null); // Error state
    const [success, setSuccess] = useState<boolean>(false); // Success state
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false); // Loading state

    const handleDeleteInvite = () => {
        // Show the confirmation dialog
        setIsDialogOpen(true);
        // Reset error and success states
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

            // Set success state
            setSuccess(true);
        } catch (err) {
            // Set error state
            setError("An error occurred while deleting the invite. Please try again.");
        }

        // Close the dialog
        setDeleteLoading(false);
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
                    <DialogContentText
                        id="alert-dialog-description"
                        color={theme.palette.text.primary}
                    >
                        Are you sure you want to delete invite to {invite.invitee.email} to join the organization?
                    </DialogContentText>
                    {error && (
                        <DialogContentText color="error">
                            Error deleting invite
                        </DialogContentText>
                    )}
                    {success && (
                        <DialogContentText color="success">
                            Invite deleted successfully!
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" disabled={deleteLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDeleteInvite} color="primary" autoFocus>
                        {deleteLoading ? <CircularProgress size={24} /> : "Confirm"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteInviteButton;