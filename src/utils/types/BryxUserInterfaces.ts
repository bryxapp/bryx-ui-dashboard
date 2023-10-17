import { SubscriptionType } from "./SubscriptionInterfaces";

export interface BryxUserInfo {
    userId: string;
    auth0UserId: string;
    subscription: SubscriptionType;
    stripeUserId: string;
}