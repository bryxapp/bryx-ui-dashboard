//Methods for creating and updating templates using axios

import axios from 'axios';
import { EstimateData, EstimateFormFields, EstimateResponse, } from '../types/EstimateInterfaces';
import { TemplateData, EstimateTemplateUsedData } from '../types/TemplateInterfaces';
import { createImageUrl } from '../canvasUtils';
import { Dayjs } from 'dayjs';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/estimates";

export async function createEstimate(templateData: TemplateData, estimateName: string, formInputs: EstimateFormFields, token: string) {
    const estimateImgObj = await createImageUrl(templateData.canvasDesign, formInputs);
    //Create Body
    const body = {
        templateId: templateData.id,
        templateFriendlyName: templateData.friendlyName,
        estimateName: estimateName,
        estimateImgObj: estimateImgObj,
    }
    const response = await axios.post(`${BASE_URL}`, body, { headers: { Authorization: `Bearer ${token}` } });
    return response.data as EstimateData;
}

export async function createEstimatePDF(estimate: EstimateData) {
    //Create Body
    const body = { estimateId: estimate.id }
    const response = await axios.post(`${BASE_URL}/pdf`, body, { headers: {} });
    return response.data as EstimateData;
}

export async function getEstimates(
    pageSize: number,
    pageNumber: number,
    token: string,
    searchTerm?: string,
    templateId?: string,
    dateRange?: [Dayjs | null, Dayjs | null],
): Promise<EstimateResponse> {
    console.log("ESTIMATES API");
    // Initialize base URL, fix the double ampersand
    let url = `${BASE_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`;

    // Append searchTerm if provided
    if (searchTerm) {
        url += `&searchTerm=${searchTerm}`;
    }

    // Append templateId if provided
    if (templateId) {
        url += `&templateId=${templateId}`;
    }

    // Append startDate and endDate if the dateRange is provided
    if (dateRange) {
        const [startDate, endDate] = dateRange;
        if (startDate && endDate) {
            url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        }
        console.log(url)
    }

    url = encodeURI(url);
    // Execute the GET request with the Authorization header
    const response = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return response.data as EstimateResponse;
}

export async function getUsedTemplates(token: string) {
    const response = await axios.get(`${BASE_URL}/templates`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data as EstimateTemplateUsedData[];
}


export async function getEstimate(id: string) {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data as EstimateData;
}

export async function deleteEstimate(templateId: string, token: string) {
    await axios.delete(`${BASE_URL}/${templateId}`, { headers: { Authorization: `Bearer ${token}` } });
}