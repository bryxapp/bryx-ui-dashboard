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
    const theme = useTheme();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [error, setError] = useState<string | null>(null); // Error state
    const [success, setSuccess] = useState<boolean>(false); // Success state

    const handleRemoveMember = () => {
        // Show the confirmation dialog
        setIsDialogOpen(true);
        // Reset error and success states
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

            // Set success state
            setSuccess(true);
        } catch (err) {
            // Set error state
            setError("An error occurred while removing the member. Please try again.");
        }

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
                    <DialogContentText 
                    id="alert-dialog-description"
                    color = {theme.palette.text.primary}
                    >
                        Are you sure you want to remove member {member.name} from the organization?
                    </DialogContentText>
                    {error && (
                        <DialogContentText color="error">
                            Error removing member
                        </DialogContentText>
                    )}
                    {success && (
                        <DialogContentText color="success">
                            Member removed successfully!
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmRemoveMember} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default RemoveMemberButton;
