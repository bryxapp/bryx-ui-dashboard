//Methods for creating and updating templates using axios

import axios from 'axios';
import { createStage } from '../canvas-util';
import { getPDFHeight, getPDFWidth } from '../page-util';
import { CanvasDesignData } from '../types/CanvasInterfaces';
import { EstimateFormFields } from '../types/EstimateInterfaces';

const BASE_URL = "https://bryx-api-estimates.azurewebsites.net/api/estimates";

export async function createEstimate(canvasDesign: CanvasDesignData, templateId: string, estimateName: string, fieldValues: EstimateFormFields, token: string) {
    const estimateImgObj = await createStage(canvasDesign, fieldValues);
    //Create Body
    const body = {
        templateId: templateId,
        estimateName: estimateName,
        estimateImgObj: estimateImgObj,
        estimatePDFHeight: getPDFHeight(),
        estimatePDFWidth: getPDFWidth()
    }
    return axios.post(`${BASE_URL}`, body, { headers: { Authorization: `Bearer ${token}` } });
}

export function getEstimates(pageSize: number, pageNumber: number, token:string, searchTerm?: string, templateId?: string) {
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
    return axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
}

export function getEstimate(id: string, token: string) {
    return axios.get(`${BASE_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
}

export function deleteEstimate(templateId: string, token: string) {
    return axios.delete(`${BASE_URL}/${templateId}`, { headers: { Authorization: `Bearer ${token}` } });
}