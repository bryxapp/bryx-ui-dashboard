import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { useEffect, useState } from "react";
import { getOrganizationMembers } from "../../utils/api/org-api";
import { useAuth0User } from "../../utils/customHooks/useAuth0User";
import { Invite, Member, OrganizationMembers } from "../../utils/types/OrganizationInterfaces";
import { useOrganizationContext } from "../../utils/contexts/OrganizationContext";
import MemberLineItem from "./Members/MemberListItem";
import InviteLineItem from "./Members/InviteListItem";
import InviteButton from "./Members/InviteButton";

const Admin: React.FC = () => {
    const theme = useTheme();
    const { organization } = useOrganizationContext();
    const [members, setMembers] = useState<Member[]>([]);
    const [invites, setInvites] = useState<Invite[]>([]);
    const { getAccessToken } = useAuth0User();

    useEffect(() => {
        async function fetchMembers() {
            if (!organization) return;
            const token = await getAccessToken();
            if (!token) return;
            const fetchedMembers = await getOrganizationMembers(token) as OrganizationMembers;
            setMembers(fetchedMembers.members.data);
            setInvites(fetchedMembers.invites.data);
        }
        fetchMembers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organization]);

    return (
        <>
            <Typography variant="h3" color={theme.palette.text.primary}>
                Admin
            </Typography>
            <br />
            <Box sx={{ width: "100%", marginTop: 2 }}>
                <Typography variant="h5" color={theme.palette.text.primary}>
                    Team Name: {organization?.bryxOrg.orgDisplayName}
                </Typography>
                <InviteButton disabled = {members.length+invites.length >=5}/>
                <Typography variant="h6" color={theme.palette.text.primary}>
                    Members
                </Typography>
                {members && members?.map((member) => (
                    <MemberLineItem key={member.user_id} member={member} />
                ))}
                <Typography variant="h6" color={theme.palette.text.primary}>
                    Invites
                </Typography>
                {invites && invites?.map((invite) => (
                    <InviteLineItem key={invite.inviteId} invite={invite} />
                ))}
            </Box>
        </>
    );
};

export default Admin;
