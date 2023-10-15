import { getOrganizationSubscription } from "./api/org-api";
import { getUserSubscription } from "./api/user-api";
import { SubscriptionEnum, SubscriptionType } from "./types/SubscriptionInterfaces";

export const mapSubscriptionType = (subResponse: string): SubscriptionType => {
    const normalizedResponse = subResponse.toUpperCase().trim();
    switch (normalizedResponse) {
        case SubscriptionEnum.PRO:
            return SubscriptionEnum.PRO as SubscriptionType;
        case SubscriptionEnum.TEAM:
            return SubscriptionEnum.TEAM as SubscriptionType;
        case SubscriptionEnum.EXPIRED:
            return SubscriptionEnum.EXPIRED as SubscriptionType;
        case "":
        default:
            return SubscriptionEnum.STARTER as SubscriptionType;
    }
}

export const getSubscription = (token: string, isOrg: boolean) => {
    if (isOrg) {
        return getOrganizationSubscription(token);
    }
    return getUserSubscription(token);
}