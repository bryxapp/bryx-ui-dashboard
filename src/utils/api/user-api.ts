//Methods for creating and updating templates using axios

import axios from 'axios';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/user";
export type SubscriptionType = "STARTER" | "PRO" | "TEAM" | "ENTERPRISE";

export function getUser(token: string) {
    // Get all templates from the api
    return axios.get(BASE_URL, { headers: { Authorization: `Bearer ${token}` } });
}

export async function getSubscription(token: string) {
    // Get all templates from the api
    try {
        const response = await axios.get(BASE_URL, { headers: { Authorization: `Bearer ${token}` } });
        return subscriptionMap(response.data.subscription) as SubscriptionType;
    }
    catch (error) {
        console.log(error);
    }
    return null;
}

const subscriptionMap = (subResponse: string) => {
    subResponse = subResponse.toUpperCase().trim();
    switch (subResponse) {
        case "PRO":
            return "PRO";
        case "TEAM":
            return "TEAM";
        case "ENTERPRISE":
            return "ENTERPRISE";
        case "":
        case "STARTER":
        default:
            return "STARTER";
    }
}

