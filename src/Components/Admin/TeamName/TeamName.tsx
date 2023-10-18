import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Tooltip
} from "@mui/material";
import { StyledTextField as TextField } from "../../SharedComponents/TextField/TextField";
import { getOrganization, renameOrg } from "../../../utils/api/org-api";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import Edit from "@mui/icons-material/Edit";
import { useOrganizationContext } from "../../../utils/contexts/OrganizationContext";

interface TeamNameProps {
    teamName: string | undefined;
}
const TeamName = ({ teamName }: TeamNameProps) => {
    const { getAccessToken } = useAuth0User();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTeamName, setNewTeamName] = useState(teamName);
    const [isValidTeamName, setIsValidTeamName] = useState(true);
    const { setOrganization } = useOrganizationContext();

    const handleEditTeamName = async () => {
        // Show the confirmation dialog
        setIsDialogOpen(true);
    };

    const handleConfirmTeamRename = async () => {
        if (!isValidTeamName) return; // Prevent sending invite if email is not valid

        const token = await getAccessToken();
        if (!token) return;
        if (!newTeamName) return;
        await renameOrg(token, newTeamName);

        const org = await getOrganization(token);
        setOrganization(org);

        // Close the dialog
        setIsDialogOpen(false);
    };

    const handleCloseDialog = () => {
        // Close the dialog without removing the user
        setNewTeamName(teamName);
        setIsDialogOpen(false);
    };

    const handleTeamNameChange = (event: any) => {
        const enteredTeamName = event.target.value;
        setNewTeamName(enteredTeamName);

        // Validate email format
        setIsValidTeamName(enteredTeamName.length > 0);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Typography variant="h5" color="textPrimary">
                    Team Name: {teamName}
                </Typography>
                <Tooltip title="Edit Team Name">
                    <IconButton onClick={handleEditTeamName} color="primary">
                        <Edit />
                    </IconButton>
                </Tooltip>
            </div>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Edit Team Name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="teamName"
                        label="Team Name"
                        type="text"
                        fullWidth
                        value={newTeamName}
                        onChange={handleTeamNameChange}
                        error={!isValidTeamName}
                        helperText={!isValidTeamName ? "Team Name cannot be empty" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmTeamRename} color="primary" autoFocus disabled={!isValidTeamName}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TeamName;
