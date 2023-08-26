import axios from 'axios';
import { EstimateFormFields } from '../types/EstimateInterfaces';

const BASE_URL = "https://bryx-api-estimates.azurewebsites.net/api/estimateDrafts";

export async function createEstimateDraft(templateId: string, estimateName: string, fieldValues: EstimateFormFields, token: string) {
    //Create Body
    const body = {
        templateId: templateId,
        estimateName: estimateName,
        filledFields: fieldValues,
    }
    return axios.post(`${BASE_URL}`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getEstimateDrafts(pageSize: number, pageNumber: number, token: string) {
    //get all templates from the api
    return axios.get(`${BASE_URL}?&pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getEstimateDraft(id: string, token: string) {
    console.log(`${BASE_URL}/${id}`)
    return axios.get(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function updateEstimateDraft(templateId: string, estimateName: string, fieldValues: EstimateFormFields, id: string, token: string) {
    //Create Body
    const body = {
        templateId: templateId,
        estimateName: estimateName,
        filledFields: fieldValues,
    }
    return axios.put(`${BASE_URL}/${id}`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function deleteEstimateDraft(estimateDraftId: string, token: string) {
    return axios.delete(`${BASE_URL}/${estimateDraftId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}