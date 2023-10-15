import axios from 'axios';
import { SubscriptionType } from '../types/SubscriptionInterfaces';
import { mapSubscriptionType } from '../subscription-util';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/organization";

const createAuthHeader = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });

export function getOrganization(token: string) {
    // Fetch the organization from the API
    return axios.get(BASE_URL, createAuthHeader(token));
}

export async function getOrganizationSubscription(token: string): Promise<SubscriptionType | null> {
    try {
        const response = await axios.get(BASE_URL, createAuthHeader(token));
        return mapSubscriptionType(response.data.bryxOrg.subscription);
    } catch (error) {
        console.error("Failed to fetch subscription:", error);
        return null;
    }
}
