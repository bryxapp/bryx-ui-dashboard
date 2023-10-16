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
    members: Member[]
    invites: Invite[]
}

export interface Member {
    userId: string;
    displayName: string;
    email: string;
}

export interface Invite {
    inviteId: string;
    email: string;
}