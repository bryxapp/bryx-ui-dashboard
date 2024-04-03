import { Typography, Tooltip, List, Card } from "antd";
import { Member } from "../../../utils/types/OrganizationInterfaces";
import { useOrganizationContext } from "../../../utils/contexts/OrganizationContext";
import RemoveMemberButton from "./RemoveMemberButton";

const { Text } = Typography;

interface MemberItemProps {
    member: Member;
    setMembers: (members: any) => void;
    setInvites: (invites: any) => void;
}

const MemberLineItem = ({ member, setInvites, setMembers }: MemberItemProps) => {
    const { organization } = useOrganizationContext();
    const lineItemIsOwner = member.user_id === organization?.bryxOrg.ownerUserId;

    return (
        <List.Item>
            <Card style={{ width: 500, marginBottom: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text strong>{member.name}</Text>
                    <div>
                        {!lineItemIsOwner ? (
                            <Tooltip title="Delete Member">
                                <RemoveMemberButton member={member} setInvites={setInvites} setMembers={setMembers} />
                            </Tooltip>
                        ) : (
                            <Text strong>Owner</Text>
                        )}
                    </div>
                </div>
            </Card>
        </List.Item>
    );
};

export default MemberLineItem;