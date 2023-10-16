import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { useState } from "react";
import { deleteInviteToOrg } from "../../../utils/api/org-api";
import { useAccessToken } from "../../../utils/customHooks/useAccessToken";
import { Invite } from "../../../utils/types/OrganizationInterfaces";
import { ListItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface InviteItemProps {
    invite: Invite;
}

const InviteLineItem = ({ invite }: InviteItemProps) => {
    const theme = useTheme();
    const { getAccessToken } = useAccessToken();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleRemoveUser = async () => {
        const token = await getAccessToken();
        if (!token) return;
        // Show the confirmation dialog
        setIsDialogOpen(true);
    };

    const handleConfirmDeleteInvite = async () => {
        const token = await getAccessToken();
        if (!token) return;

        await deleteInviteToOrg(token, invite.inviteId);

        // Close the dialog
        setIsDialogOpen(false);
    };

    const handleCloseDialog = () => {
        // Close the dialog without removing the user
        setIsDialogOpen(false);
    };

    return (
        <ListItem>
            <Typography variant="h5" color={theme.palette.text.primary}>
                {invite.email}
            </Typography>
            <Button onClick={handleRemoveUser} variant="outlined" color="secondary">
                Delete Invite
            </Button>)


            <Dialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete invite to {invite.email} to join the organization?
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
        </ListItem>
    );
};

export default InviteLineItem;