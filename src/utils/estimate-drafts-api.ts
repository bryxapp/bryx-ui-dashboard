import axios from 'axios';

const BASE_URL = "https://bryx-api-estimates.azurewebsites.net/api/estimateDrafts";

export async function createEstimateDraft(templateId: string, estimateName: string, fieldValues: string[], user: string) {
    //Create Body
    const body = {
        user: user,
        templateId: templateId,
        estimateName: estimateName,
        fields: fieldValues,
    }
    return axios.post(`${BASE_URL}`, body);
}

export function getEstimateDrafts(user: string) {
    //get all templates from the api
    return axios.get(`${BASE_URL}?userId=${user}`);
}

export function getEstimateDraft(id: string) {
    return axios.get(`${BASE_URL}/${id}`);
}

export async function updateEstimateDraft(templateId: string, estimateName: string, fieldValues: string[], user: string, id: string) {
    //Create Body
    const body = {
        user: user,
        templateId: templateId,
        estimateName: estimateName,
        fields: fieldValues,
    }
    return axios.put(`${BASE_URL}/${id}`, body);
}

export function deleteEstimateDraft(templateId: string) {
    return axios.delete(`${BASE_URL}/${templateId}`);
}