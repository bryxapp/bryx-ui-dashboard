import Typography from "@mui/material/Typography";
import { Invite } from "../../../utils/types/OrganizationInterfaces";
import { ListItem, Paper, Tooltip } from "@mui/material";
import DeleteInviteButton from "./DeleteInviteButton";

interface InviteItemProps {
    invite: Invite;
    setMembers: (members: any) => void;
    setInvites: (invites: any) => void;
}

const InviteLineItem = ({ invite, setInvites, setMembers }: InviteItemProps) => {
    return (
        <Paper sx={{ width: 500, marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <ListItem>
                <div style={{ flex: 1 }}>
                    <Typography variant="h5" color="textPrimary">
                        {invite.invitee.email}
                    </Typography>
                </div>
                <Tooltip title="Delete Invite">
                    <div>
                        <DeleteInviteButton invite={invite} setInvites={setInvites} setMembers={setMembers} />
                    </div>
                </Tooltip>
            </ListItem>
        </Paper>
    );
};

export default InviteLineItem;