import { SubscriptionType } from "./SubscriptionInterfaces";

export interface OrganizationInfo {
    bryxOrg: {
        orgId: string;
        orgDisplayName: string;
        stripeOrgId: string;
        ownerUserId: string;
        subscription: SubscriptionType
    },
    auth0Org: {
        id: string
        name: string
        display_name: string
    }
}

export interface OrganizationMembers {
    members: { data: Member[] }
    invites: { data: Invite[] }
}

export interface Member {
    user_id: string;
    email: string;
    name: string;
}

export interface Invite {
    inviteId: string;
    email: string;
}