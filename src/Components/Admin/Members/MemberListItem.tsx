import Typography from "@mui/material/Typography";
import { Member } from "../../../utils/types/OrganizationInterfaces";
import { useOrganizationContext } from "../../../utils/contexts/OrganizationContext";
import { ListItem, Paper, Tooltip } from "@mui/material";
import RemoveMemberButton from "./RemoveMemberButton";

interface MemberItemProps {
    member: Member;
    setMembers: (members: any) => void;
    setInvites: (invites: any) => void;
}

const MemberLineItem = ({ member, setInvites, setMembers }: MemberItemProps) => {
    const { organization } = useOrganizationContext();
    const lineItemIsOwner = member.user_id === organization?.bryxOrg.ownerUserId;

    return (
        <Paper sx={{ width: 500, marginBottom: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <ListItem>
                <Typography variant="h5" color="textPrimary" style={{ flex: 1 }}>
                    {member.name}
                </Typography>
                <div>
                    {!lineItemIsOwner ? (
                        <Tooltip title="Delete Invite">
                            <div>
                                <RemoveMemberButton member={member} setInvites={setInvites} setMembers={setMembers} />
                            </div>
                        </Tooltip>
                    ) : (
                        <Typography variant="h5" color="textPrimary">
                            Owner
                        </Typography>
                    )}
                </div>
            </ListItem>
        </Paper>
    );
};

export default MemberLineItem;