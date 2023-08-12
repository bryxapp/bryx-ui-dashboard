//Methods for creating and updating templates using axios

import axios from 'axios';
import { CanvasDesignData } from './types/CanvasInterfaces';
const BASE_URL = "https://bryx-api-templates.azurewebsites.net/api/templates";


export function createTemplate(canvasDesign: CanvasDesignData, friendlyName: string, user: string, token: string) {
    //Create Body
    const body = {
        user: user,
        friendlyName: friendlyName,
        canvasDesign: canvasDesign
    }

    return axios.post(`${BASE_URL}`, body, { headers: { Authorization: `Bearer ${token}` } });
}

export function updateTemplate(templateId: string, canvasDesign: CanvasDesignData, friendlyName: string, user: string, token: string) {
    // Create Body
    const body = {
        user: user,
        friendlyName: friendlyName,
        canvasDesign: canvasDesign
    };

    return axios.put(`${BASE_URL}/${templateId}`, body, { headers: { Authorization: `Bearer ${token}` } });
}

export function getTemplates(user: string, token: string) {
    //get all templates from the api
    return axios.get(`${BASE_URL}?userId=${user}`, { headers: { Authorization: `Bearer ${token}` } });
}

export function getRecentTemplates(count: number, user: string, token: string) {
    //get all templates from the api
    return axios.get(`${BASE_URL}?userId=${user}&count=${count}`, { headers: { Authorization: `Bearer ${token}` } });
}

export function getTemplate(id: string, token: string) {
    return axios.get(`${BASE_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

export function deleteTemplate(templateId: string, token: string) {
    return axios.delete(`${BASE_URL}/${templateId}`, { headers: { Authorization: `Bearer ${token}` } });
}