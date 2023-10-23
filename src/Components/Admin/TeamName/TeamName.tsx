import { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Tooltip,
    DialogContentText
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
    const [error, setError] = useState<string | null>(null); // Error state
    const [success, setSuccess] = useState<boolean>(false); // Success state
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
        if (!token) return;
        if (!newTeamName) return;

        try {
            await renameOrg(token, newTeamName);

            const org = await getOrganization(token);
            setOrganization(org);

            // Set success state
            setSuccess(true);
        } catch (err) {
            // Set error state
            setError("An error occurred while renaming the team name. Please try again.");
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
                    {error && (
                        <DialogContentText color="error">
                            {error}
                        </DialogContentText>
                    )}
                    {success && (
                        <DialogContentText color="success">
                            Team name changed successfully!
                        </DialogContentText>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmTeamRename} color="primary" autoFocus disabled={!isValidTeamName || success}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TeamName;