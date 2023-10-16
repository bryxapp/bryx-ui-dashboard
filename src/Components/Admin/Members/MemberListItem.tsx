import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";
import { useState } from "react";
import { removeMemberFromOrg } from "../../../utils/api/org-api";
import { useAccessToken } from "../../../utils/customHooks/useAccessToken";
import { Member } from "../../../utils/types/OrganizationInterfaces";
import { useOrganizationContext } from "../../../utils/contexts/OrganizationContext";
import { ListItem, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface MemberItemProps {
    member: Member;
}

const MemberLineItem = ({ member }: MemberItemProps) => {
    const theme = useTheme();
    const { organization } = useOrganizationContext();
    const { getAccessToken } = useAccessToken();
    const lineItemIsOwner = member.userId === organization?.bryxOrg.ownerUserId;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleRemoveUser = async () => {
        const token = await getAccessToken();
        if (!token) return;

        // Show the confirmation dialog
        setIsDialogOpen(true);
    };

    const handleConfirmRemoveUser = async () => {
        const token = await getAccessToken();
        if (!token) return;

        await removeMemberFromOrg(token, member.userId);

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
                {member.displayName}
            </Typography>
            {!lineItemIsOwner && (
                <Button onClick={handleRemoveUser} variant="outlined" color="secondary">
                    Remove User
                </Button>)
            }

            <Dialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Removal</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to remove {member.displayName} from the organization?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmRemoveUser} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    );
};

export default MemberLineItem;