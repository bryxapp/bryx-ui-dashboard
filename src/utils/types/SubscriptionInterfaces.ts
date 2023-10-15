export type SubscriptionType = "STARTER" | "PRO" | "TEAM" | "EXPIRED";

export enum SubscriptionEnum {
    STARTER = "STARTER",
    PRO = "PRO",
    TEAM = "TEAM",
    EXPIRED = "EXPIRED"
}

export type SubscriptionInfo = {
    name: SubscriptionType;
    monthlyPrice: string;
    monthlyPriceInt: number;
    features: string[];
    stripeId: string;
}

export const starterSubscription: SubscriptionInfo = {
    name: "STARTER",
    monthlyPrice: "FREE",
    monthlyPriceInt: 0,
    features: [
        "Single user account",
        "Create up to 3 Templates",
        "Save 10 Estimates"
    ],
    stripeId: ""
}

export const proSubscription: SubscriptionInfo = {
    name: "PRO",
    monthlyPrice: "$15+tax/mo",
    monthlyPriceInt: 15,
    features: [
        "Single user account",
        "Create up to 5 Templates",
        "Unlimited Estimates"
    ],
    stripeId: 'price_1NypfzEjO3JKZRm1Wj1BdyDz'
}

export const teamSubscription: SubscriptionInfo = {
    name: "TEAM",
    monthlyPrice: "$50+tax/mo",
    monthlyPriceInt: 50,
    features: [
        "Up to 10 team members",
        "Create Unlimited Templates",
        "Unlimited Estimates"
    ],
    stripeId: 'price_1NypgEEjO3JKZRm1JSmm4nSC'
}

export const mapSubscriptionToInfo = (subscription: SubscriptionType): SubscriptionInfo => {
    switch(subscription) {
        case "STARTER":
            return starterSubscription;
        case "PRO":
            return proSubscription;
        case "TEAM":
        case "EXPIRED":
            return teamSubscription; 
        default:
            return starterSubscription;
    }
}
