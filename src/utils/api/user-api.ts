import axios from 'axios';
import { SubscriptionType } from '../types/SubscriptionInterfaces';
import { mapSubscriptionType } from '../subscription-util';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/user";


const createAuthHeader = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });

export function getUser(token: string) {
    // Fetch the user from the API
    return axios.get(BASE_URL, createAuthHeader(token));
}

export async function getUserSubscription(token: string): Promise<SubscriptionType | null> {
    try {
        const response = await axios.get(BASE_URL, createAuthHeader(token));
        return mapSubscriptionType(response.data.subscription);
    } catch (error) {
        console.error("Failed to fetch subscription:", error);
        return null;
    }
}

export async function updateUserSubscription(sessionId: string,) {
    try {
        const response = await axios.put(`${BASE_URL}/subscription`, { sessionId: sessionId },);
        return response.data
    } catch (error) {
        console.error("Failed to update subscription:", error);
        return null;
    }
}
