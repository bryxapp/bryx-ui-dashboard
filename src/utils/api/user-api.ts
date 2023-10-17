import axios from 'axios';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/user";


const createAuthHeader = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });

export async function getUser(token: string) {
    try{
        const response = await axios.get(BASE_URL, createAuthHeader(token));
        return response.data;
    }
    catch (error) {
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
