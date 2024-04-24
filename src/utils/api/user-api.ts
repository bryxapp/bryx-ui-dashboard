import axios from 'axios';
import { BryxUserInfo } from '../types/BryxUserInterfaces';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/user";


const createAuthHeader = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });

export async function getUser(token: string) {
    const response = await axios.get(BASE_URL, createAuthHeader(token));
    return response.data as BryxUserInfo
}

export async function updateUserSubscription(sessionId: string,) {
    const response = await axios.put(`${BASE_URL}/subscription`, { sessionId: sessionId },);
    return response.data as BryxUserInfo
}

export async function getOrganizationsForUser(token: string) {
    const response = await axios.get(`${BASE_URL}/organizations`, createAuthHeader(token));
    return response.data as any
}
