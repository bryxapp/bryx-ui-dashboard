//Methods for creating and updating templates using axios

import axios from 'axios';
import { CanvasDesignData } from './types/CanvasInterfaces';
const BASE_URL = "https://bryx-api-templates.azurewebsites.net/api/templates";


export function createTemplate(canvasDesign: CanvasDesignData, friendlyName: string, user: string) {
    //Create Body
    const body = {
        user: user,
        friendlyName: friendlyName,
        canvasDesign: canvasDesign
    }

    return axios.post(`${BASE_URL}`, body);
}

export function updateTemplate(templateId: string, canvasDesign: CanvasDesignData, friendlyName: string, user: string) {

    //Create Body
    const body = {
        user: user,
        friendlyName: friendlyName,
        canvasDesign: canvasDesign
    }

    return axios.put(`${BASE_URL}/${templateId}`, body);
}

export function getTemplates(user: string, token: string) {
    //get all templates from the api
    return axios.get(`${BASE_URL}?userId=${user}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}

export function getRecentTemplates(count: number, user: string) {
    //get all templates from the api
    return axios.get(`${BASE_URL}?userId=${user}&count=${count}`);
}

export function getTemplate(id: string) {
    return axios.get(`${BASE_URL}/${id}`);
}

export function deleteTemplate(templateId: string) {
    return axios.delete(`${BASE_URL}/${templateId}`);
}