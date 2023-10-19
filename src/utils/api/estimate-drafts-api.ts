import axios from 'axios';
import { EstimateDraftData, EstimateFormFields } from '../types/EstimateInterfaces';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/estimateDrafts";

export async function createEstimateDraft(templateId: string, estimateName: string, fieldValues: EstimateFormFields, token: string) {
    //Create Body
    const body = {
        templateId: templateId,
        estimateName: estimateName,
        filledFields: fieldValues,
    }
    await axios.post(`${BASE_URL}`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function getEstimateDrafts(pageSize: number, pageNumber: number, token: string) {
    //get all templates from the api
    const response = await axios.get(`${BASE_URL}?&pageNumber=${pageNumber}&pageSize=${pageSize}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.fetchedEstimateDrafts as EstimateDraftData[];
}

export async function getEstimateDraft(id: string, token: string) {
    const response = await axios.get(`${BASE_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data as EstimateDraftData;
}

export async function updateEstimateDraft(templateId: string, estimateName: string, fieldValues: EstimateFormFields, id: string, token: string) {
    //Create Body
    const body = {
        templateId: templateId,
        estimateName: estimateName,
        filledFields: fieldValues,
    }
    const response = await axios.put(`${BASE_URL}/${id}`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data as EstimateDraftData;
}

export async function deleteEstimateDraft(estimateDraftId: string, token: string) {
    await axios.delete(`${BASE_URL}/${estimateDraftId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}