//Methods for creating and updating templates using axios

import axios from 'axios';
import { SubscriptionType } from '../types/SubscriptionInterfaces';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/checkout";

export async function createCheckoutSession(priceId: string) {
    const response = await axios.post(BASE_URL, { priceId: priceId });
    return response.data;
}

export async function updateSubscription(sessionId: string, userId: string, subscriptionName: SubscriptionType) {
    const response = await axios.put(BASE_URL, { sessionId: sessionId, userId: userId, subscriptionName: subscriptionName });
    return response.data;
}

