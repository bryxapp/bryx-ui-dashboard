//Methods for creating and updating templates using axios

import axios from 'axios';
import { EstimateData, EstimateFormFields, EstimateResponse, } from '../types/EstimateInterfaces';
import { TemplateData, EstimateTemplateUsedData } from '../types/TemplateInterfaces';
import { createImageUrl } from '../canvasUtils';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/estimates";

export async function createEstimate(templateData: TemplateData, estimateName: string, fieldValues: EstimateFormFields, token: string) {
    //Create Body
    const body = {
        templateId: templateData.id,
        templateFriendlyName: templateData.friendlyName,
        estimateName: estimateName,
        canvasDesign: templateData.canvasDesign,
        fieldValues: fieldValues,
    }
    const response = await axios.post(`${BASE_URL}`, body, { headers: { Authorization: `Bearer ${token}` } });
    return response.data as EstimateData;
}

export async function createEstimatePDF(estimate: EstimateData) {
    const pdfMultiplier = 72;
    const estimateImgObj = await createImageUrl(estimate.canvasDesign, estimate.fieldValues);
    //Create Body
    const body = {
        estimateId: estimate.id,
        estimateImgObj: estimateImgObj,
        estimatePDFHeight: estimate.canvasDesign.pageHeight * pdfMultiplier,
        estimatePDFWidth: estimate.canvasDesign.pageWidth * pdfMultiplier,
    }
    const response = await axios.post(`${BASE_URL}/pdf`, body, { headers: {} });
    return response.data as EstimateData;
}

export async function getEstimates(pageSize: number, pageNumber: number, token: string, searchTerm?: string, templateId?: string) {
    console.log("ESTIMATES API")
    // Initialize base URL
    let url = `${BASE_URL}?&pageNumber=${pageNumber}&pageSize=${pageSize}`;

    // Check if searchTerm is provided
    if (searchTerm) {
        url += `&searchTerm=${searchTerm}`;
    }

    // Check if templateId is provided
    if (templateId) {
        url += `&templateId=${templateId}`;
    }

    // Get all templates from the api
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