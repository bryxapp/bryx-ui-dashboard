import axios from 'axios';
import { Invite, OrganizationInfo, OrganizationMembers } from '../types/OrganizationInterfaces';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/organization";

const createAuthHeader = (token: string) => ({ headers: { Authorization: `Bearer ${token}` } });

export async function getOrganization(token: string) {
    const response = await axios.get(BASE_URL, createAuthHeader(token));
    return response.data as OrganizationInfo
}

export async function getOrganizationMembers(token: string) {
    const response = await axios.get(BASE_URL + "/members", createAuthHeader(token));
    return response.data as OrganizationMembers;
}

export async function removeMemberFromOrg(token: string, memberId: string) {
    const body = { memberId };
    await axios.delete(BASE_URL + "/member", { ...createAuthHeader(token), data: body });
}

export async function deleteInviteToOrg(token: string, inviteId: string) {
    const body = { inviteId };
    await axios.delete(BASE_URL + "/invite", { ...createAuthHeader(token), data: body });
}

export async function inviteMemberToOrg(token: string, email: string) {
    const body = { email };
    const response = await axios.post(BASE_URL + "/invite", body, createAuthHeader(token));
    return response.data as Invite;
}
