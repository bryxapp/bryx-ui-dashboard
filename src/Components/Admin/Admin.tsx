import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { useEffect, useState } from "react";
import { getOrganization, getOrganizationMembers } from "../../utils/api/org-api";
import { useAccessToken } from "../../utils/customHooks/useAccessToken";
import { Invite, Member, OrganizationInfo, OrganizationMembers } from "../../utils/types/OrganizationInterfaces";
import { useOrganizationContext } from "../../utils/contexts/OrganizationContext";
import MemberLineItem from "./Members/MemberListItem";
import InviteLineItem from "./Members/InviteListItem";

const Admin: React.FC = () => {
    const theme = useTheme();
    const { organization, setOrganization } = useOrganizationContext();
    const [members, setMembers] = useState<Member[] | undefined>();
    const [invites, setInvites] = useState<Invite[] | undefined>();
    const { user, getAccessToken } = useAccessToken();

    useEffect(() => {
        async function fetchOrg() {
            if (organization || !user) return;
            const token = await getAccessToken();
            if (!token) return;
            const fetchedOrg = await getOrganization(token);
            setOrganization(fetchedOrg.data as OrganizationInfo);
        }

        fetchOrg();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.org_id]);

    useEffect(() => {
        async function fetchMembers() {
            if (!organization) return;
            const token = await getAccessToken();
            if (!token) return;
            const fetchedMembers = await getOrganizationMembers(token) as OrganizationMembers;
            setMembers(fetchedMembers.members);
            setInvites(fetchedMembers.invites);
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
                    {organization?.bryxOrg.orgDisplayName}
                </Typography>
                <Typography variant="h6" color={theme.palette.text.primary}>
                    Members
                </Typography>
                {members?.map((member) => (
                    <MemberLineItem key={member.userId} member={member} />
                ))}
                <Typography variant="h6" color={theme.palette.text.primary}>
                    Invites
                </Typography>
                {invites?.map((invite) => (
                    <InviteLineItem key={invite.inviteId} invite={invite} />
                ))}
            </Box>
        </>
    );
};

export default Admin;
