import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useTheme from "@mui/material/styles/useTheme";
import { useEffect, useState } from "react";
import { getOrganizationMembers } from "../../utils/api/org-api";
import { useAuth0User } from "../../utils/customHooks/useAuth0User";
import { Invite, Member, OrganizationMembers } from "../../utils/types/OrganizationInterfaces";
import { useOrganizationContext } from "../../utils/contexts/OrganizationContext";
import MemberLineItem from "./Members/MemberListItem";
import InviteLineItem from "./Invites/InviteListItem";
import InviteButton from "./InviteButton";
import TeamName from "./TeamName/TeamName";

const Admin: React.FC = () => {
    const theme = useTheme();
    const { organization } = useOrganizationContext();
    const [members, setMembers] = useState<Member[]>([]);
    const [invites, setInvites] = useState<Invite[]>([]);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); // Add error state
    const { getAccessToken } = useAuth0User();

    async function fetchMembers() {
        if (!organization) return;
        const token = await getAccessToken();
        if (!token) return;

        try {
            const fetchedMembers = await getOrganizationMembers(token) as OrganizationMembers;
            setMembers(fetchedMembers.members.data);
            setInvites(fetchedMembers.invites.data);
            setError(null); // Clear any previous errors
        } catch (err) {
            setError("An error occurred. Please try again."); // Set the error message
        }
    }

    useEffect(() => {
        fetchMembers();

        if (organization?.bryxOrg.subscription !== "TEAM") {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organization]);

    return (
        <>
            <Typography variant="h3" color={theme.palette.text.primary}>
                Admin
            </Typography>
            <br />
            <Box sx={{ width: "100%", marginTop: 2 }}>
                <TeamName teamName={organization?.bryxOrg.orgDisplayName} />
                <Box sx={{ width: "100%", marginTop: 2 }} />
                <InviteButton disabled={(disableButton || members.length + invites.length >= 5)} setMembers={setMembers} setInvites={setInvites} />
                <Box sx={{ width: "100%", marginTop: 2 }} />
                <Typography variant="h6" color={theme.palette.text.primary}>
                    Members
                </Typography>
                <Box sx={{ width: "100%", marginTop: 2 }} />
                {error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    members && members?.map((member) => (
                        <MemberLineItem key={member.user_id} member={member} setMembers={setMembers} setInvites={setInvites} />
                    ))
                )}
                <Typography variant="h6" color={theme.palette.text.primary}>
                    Invites
                </Typography>
                <Box sx={{ width: "100%", marginTop: 2 }} />
                {error ? (
                    <button onClick={fetchMembers}>Try Again</button>
                ) : (
                    invites && invites?.map((invite) => (
                        <InviteLineItem key={invite.id} invite={invite} setMembers={setMembers} setInvites={setInvites} />
                    ))
                )}
            </Box>
        </>
    );
};

export default Admin;
