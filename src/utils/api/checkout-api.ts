//Methods for creating and updating templates using axios

import axios from 'axios';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/checkout";

export async function createProCheckoutSession() {
    const response = await axios.post(BASE_URL + "/pro-checkout");
    return response.data;
}

export async function createTeamCheckoutSession(teamName: string) {
    const response = await axios.post(BASE_URL + "/team-checkout", { teamName: teamName });
    return response.data;
}

export async function updateUserToProSubscription(sessionId: string, userId: string) {
    const response = await axios.put(BASE_URL + "/pro-upgrade", { sessionId: sessionId, userId: userId });
    if (!response || response.status !== 200) {
        throw new Error("Error updating subscription");
    }
    return response;
}

export async function createTeam(sessionId: string, userId: string) {
    const response = await axios.put(BASE_URL + "/create-team", { sessionId: sessionId, userId: userId });
    if (!response || response.status !== 200) {
        throw new Error("Error updating subscription");
    }
    return response;
}
