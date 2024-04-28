import { SubscriptionType } from "./SubscriptionInterfaces";

export interface OrganizationInfo {
    bryxOrg: {
        orgId: string;
        orgDisplayName: string;
        stripeOrgId: string;
        ownerUserId: string;
        subscription: SubscriptionType
        branding: BrandingInfo
    },
    auth0Org: Auth0Organization
}

export interface BrandingInfo {
    logoUrl: string | undefined;
    primaryColor: string | undefined;
    secondaryColor: string | undefined;
}

export interface Auth0Organization {
    id: string;
    name: string;
    display_name: string;
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
    id: string;
    inviter: {
        name: string;
    };
    invitee: {
        email: string;
    };
    invitation_url: string;
    ticket_id: string;
    created_at: string;
    expires_at: string;
    organization_id: string;
}