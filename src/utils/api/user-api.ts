import axios from 'axios';
import { SubscriptionType } from '../types/SubscriptionInterfaces';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/user";
const SUBSCRIPTION_TYPES = {
    PRO: "PRO",
    TEAM: "TEAM",
    ENTERPRISE: "ENTERPRISE",
    STARTER: "STARTER"
}

const createAuthHeader = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });

export function getUser(token: string) {
    // Fetch the user from the API
    return axios.get(BASE_URL, createAuthHeader(token));
}

export async function getSubscription(token: string): Promise<SubscriptionType | null> {
    try {
        const response = await axios.get(BASE_URL, createAuthHeader(token));
        return mapSubscriptionType(response.data.subscription);
    } catch (error) {
        console.error("Failed to fetch subscription:", error);
        return null;
    }
}

export async function updateSubscription(sessionId: string,) {
    try {
        const response = await axios.put(`${BASE_URL}/subscription`, { sessionId: sessionId },);
        return response.data
    } catch (error) {
        console.error("Failed to update subscription:", error);
        return null;
    }
}

const mapSubscriptionType = (subResponse: string): SubscriptionType => {
    const normalizedResponse = subResponse.toUpperCase().trim();
    switch (normalizedResponse) {
        case SUBSCRIPTION_TYPES.PRO:
            return SUBSCRIPTION_TYPES.PRO as SubscriptionType;
        case SUBSCRIPTION_TYPES.TEAM:
            return SUBSCRIPTION_TYPES.TEAM as SubscriptionType;
        case SUBSCRIPTION_TYPES.ENTERPRISE:
            return SUBSCRIPTION_TYPES.ENTERPRISE as SubscriptionType;
        case "":
        default:
            return SUBSCRIPTION_TYPES.STARTER as SubscriptionType;
    }
}
