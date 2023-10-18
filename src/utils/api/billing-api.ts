import axios from 'axios';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/billing";

export async function createBillingSession(token: string) {
    const response = await axios.post(BASE_URL + "/billing-session",{}, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
}
