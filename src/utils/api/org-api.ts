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

export async function getOrganizationMembers(token:string){
    try{
        const response = await axios.get(BASE_URL + "/members", createAuthHeader(token));
        return response.data;
    }catch(error){
        console.error("Failed to fetch members:", error);
        return null;
    }
}

export async function removeMemberFromOrg(token: string, memberId: string){
    try{
        const body = { memberId };
        const response = await axios.delete(BASE_URL+"/member", { ...createAuthHeader(token), data: body });
        return response.data;
    }catch(error){
        console.error("Failed to remove member:", error);
        return null;
    }
}

export async function deleteInviteToOrg(token: string, inviteId: string){
    try{
        const body = { inviteId };
        const response = await axios.delete(BASE_URL+"/invite", { ...createAuthHeader(token), data: body });
        return response.data;
    }catch(error){
        console.error("Failed to delete invite:", error);
        return null;
    }
}

export async function inviteMemberToOrg(token: string, email: string){
    try{
        const body = { email };
        const response = await axios.post(BASE_URL+"/invite", body, createAuthHeader(token));
        return response.data;
    }catch(error){
        console.error("Failed to invite member:", error);
        return null;
    }
}
