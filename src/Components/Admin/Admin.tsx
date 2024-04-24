import { useState, useEffect } from "react";
import { Typography, Space, List } from "antd";
import { getOrganizationMembers } from "../../utils/api/org-api";
import { useAuth0User } from "../../utils/customHooks/useAuth0User";
import { Invite, Member, OrganizationMembers } from "../../utils/types/OrganizationInterfaces";
import { useOrganizationContext } from "../../utils/contexts/OrganizationContext";
import MemberLineItem from "./Members/MemberListItem";
import InviteLineItem from "./Invites/InviteListItem";
import InviteButton from "./InviteButton";
import TeamName from "./TeamName/TeamName";
import logger from "../../logging/logger";
import ErrorMessage from "../SharedComponents/ErrorMessage/ErrorMessage";


const { Title } = Typography;

const Admin = () => {
    const { organization } = useOrganizationContext();
    const [members, setMembers] = useState<Member[]>([]);
    const [invites, setInvites] = useState<Invite[]>([]);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null); // Add error state
    const { getAccessToken } = useAuth0User();

    useEffect(() => {
        async function fetchMembers() {
            if (!organization) return;
            const token = await getAccessToken();
            if (!token) return;

            try {
                const fetchedMembers = await getOrganizationMembers(token) as OrganizationMembers;
                setMembers(fetchedMembers.members.data);
                setInvites(fetchedMembers.invites.data);
                setError(null);
            } catch (err) {
                logger.trackException({
                    properties: {
                        name: "Admin Error",
                        page: "Admin",
                        description: "Error fetching members",
                        error: err,
                    },
                });
                setError("An error occurred. Please try again.");
            }
        }

        fetchMembers();

        if (organization?.bryxOrg.subscription !== "TEAM") {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organization]);

    if (error) return <ErrorMessage dataName="admin" />;

    return (
        <>
            <Title level={3}>Admin</Title>
            <Space direction="vertical" style={{ width: "100%", marginTop: 16 }}>
                <TeamName teamName={organization?.bryxOrg.orgDisplayName} />
                <InviteButton disabled={disableButton || members.length + invites.length >= 5} setMembers={setMembers} setInvites={setInvites} />
                <Title level={4}>Members</Title>
                <List
                    dataSource={members}
                    renderItem={member => (
                        <MemberLineItem key={member.user_id} member={member} setMembers={setMembers} setInvites={setInvites} />
                    )}
                />
                {invites.length > 0 && (
                    <>
                        <Title level={4}>Invites</Title>
                        <List
                            dataSource={invites}
                            renderItem={invite => (
                                <InviteLineItem key={invite.id} invite={invite} setMembers={setMembers} setInvites={setInvites} />
                            )}
                        />
                    </>
                )}
            </Space>
        </>
    );
};

export default Admin;
