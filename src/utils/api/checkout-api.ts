//Methods for creating and updating templates using axios

import axios from 'axios';
import { proSubscription, teamSubscription } from '../types/SubscriptionInterfaces';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/checkout";

export async function createProCheckoutSession() {
    const response = await axios.post(BASE_URL + "/pro-session", { priceId: proSubscription.stripeId });
    return response.data;
}

export async function createTeamCheckoutSession(teamName: string) {
    const response = await axios.post(BASE_URL + "/team-session", { priceId: teamSubscription.stripeId, teamName: teamName });
    return response.data;
}

export async function updateUserToProSubscription(sessionId: string, userId: string) {
    const response = await axios.put(BASE_URL + "/pro-upgrade", { sessionId: sessionId, userId: userId, subscriptionName: proSubscription.name });
    if (!response || response.status !== 200) {
        throw new Error("Error updating subscription");
    }
    return response;
}

export async function createTeam(sessionId: string, userId: string) {
    const response = await axios.put(BASE_URL + "/create-team", { sessionId: sessionId, userId: userId, subscriptionName: teamSubscription.name });
    if (!response || response.status !== 200) {
        throw new Error("Error updating subscription");
    }
    return response;
}
