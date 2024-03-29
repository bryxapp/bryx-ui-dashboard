//Methods for creating and updating templates using axios

import axios from 'axios';
import { CanvasDesignData } from '../types/CanvasInterfaces';
import { TemplateData, TemplateResponse } from '../types/TemplateInterfaces';
const BASE_URL = "https://bryx-api.azurewebsites.net/api/templates";


export async function createTemplate(canvasDesign: CanvasDesignData, friendlyName: string, token: string) {
    const body = {
        friendlyName: friendlyName,
        canvasDesign: canvasDesign
    }
    const response = await axios.post(`${BASE_URL}`, body, { headers: { Authorization: `Bearer ${token}` } });
    return response.data.template as TemplateData;
}

export async function updateTemplate(templateId: string, canvasDesign: CanvasDesignData, friendlyName: string, token: string) {
    const body = {
        friendlyName: friendlyName,
        canvasDesign: canvasDesign
    };
    const response = await axios.put(`${BASE_URL}/${templateId}`, body, { headers: { Authorization: `Bearer ${token}` } });
    return response.data.template as TemplateData;
}

export async function getTemplates(token: string) {
    const response = await axios.get(`${BASE_URL}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data as TemplateResponse
}

export async function getTemplate(id: string, token: string) {
    const response = await axios.get(`${BASE_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data as TemplateData;
}

export async function deleteTemplate(templateId: string, token: string) {
    await axios.delete(`${BASE_URL}/${templateId}`, { headers: { Authorization: `Bearer ${token}` } });
}