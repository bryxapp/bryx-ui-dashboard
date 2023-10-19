import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { StyledTextField as TextField } from "../SharedComponents/TextField/TextField";
import { getOrganizationMembers, inviteMemberToOrg } from "../../utils/api/org-api";
import { useAuth0User } from "../../utils/customHooks/useAuth0User";
import { OrganizationMembers } from "../../utils/types/OrganizationInterfaces";
import AddIcon from '@mui/icons-material/Add';

interface InviteButtonProps {
    disabled?: boolean;
    setInvites: (invites: any) => void;
    setMembers: (members: any) => void;
}
const InviteButton = ({ disabled, setInvites, setMembers }: InviteButtonProps) => {
    const { getAccessToken } = useAuth0User();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true); // To track email format validity

    const handleInviteUser = async () => {
        // Show the confirmation dialog
        setIsDialogOpen(true);
    };

    const handleConfirmInvite = async () => {
        if (!isValidEmail) return; // Prevent sending invite if email is not valid

        const token = await getAccessToken();
        if (!token) return;

        await inviteMemberToOrg(token, email);

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

    const handleEmailChange = (event: any) => {
        const enteredEmail = event.target.value;
        setEmail(enteredEmail);

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsValidEmail(emailRegex.test(enteredEmail));
    };

    return (
        <>
            <Button onClick={handleInviteUser} variant="contained" color="primary" disabled={disabled} sx={{fontWeight:"bold"}}>
                <AddIcon/> Invite User
            </Button>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Send Invite</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Enter the email below of the user you want to invite to join your team.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                        error={!isValidEmail} // Display error if email is not valid
                        helperText={!isValidEmail ? "Invalid email format" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmInvite} color="primary" autoFocus disabled={!isValidEmail}>
                        Send Invite
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default InviteButton;