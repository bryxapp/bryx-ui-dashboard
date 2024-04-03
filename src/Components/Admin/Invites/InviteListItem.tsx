import React from "react";
import { Typography, Tooltip, List, Card } from "antd";
import { Invite } from "../../../utils/types/OrganizationInterfaces";
import DeleteInviteButton from "./DeleteInviteButton";

const { Text } = Typography;

interface InviteItemProps {
    invite: Invite;
    setMembers: (members: any) => void;
    setInvites: (invites: any) => void;
}

const InviteLineItem = ({ invite, setInvites, setMembers }: InviteItemProps) => {
    return (
        <List.Item>
            <Card style={{ width: 500, marginBottom: 2 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text strong>{invite.invitee.email}</Text>
                    <div>
                        <Tooltip title="Delete Invite">
                            <DeleteInviteButton invite={invite} setInvites={setInvites} setMembers={setMembers} />
                        </Tooltip>
                    </div>
                </div>
            </Card>
        </List.Item>
    );
};

export default InviteLineItem;
