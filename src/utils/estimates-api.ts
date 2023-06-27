//Methods for creating and updating templates using axios

import axios from 'axios';
import { createStage } from './canvas-util';
import { getPDFHeight, getPDFWidth } from './page-util';
import { CanvasDesignData } from './types/CanvasInterfaces';
import { EstimateFormFields } from './types/EstimateInterfaces';

const BASE_URL = "https://bryx-api-estimates.azurewebsites.net/api/estimates";

export async function createEstimate(canvasDesign: CanvasDesignData, templateId: string, estimateName: string, fieldValues: EstimateFormFields, user: string) {
    const estimateImgObj = await createStage(canvasDesign, fieldValues);
    //Create Body
    const body = {
        user: user,
        templateId: templateId,
        estimateName: estimateName,
        estimateImgObj: estimateImgObj,
        estimatePDFHeight: getPDFHeight(),
        estimatePDFWidth: getPDFWidth()
    }
    return axios.post(`${BASE_URL}`, body);
}

export function getEstimates(user: string,pageSize:number, pageNumber: number) {
    //get all templates from the api
    return axios.get(`${BASE_URL}?userId=${user}&pageNumber=${pageNumber}&pageSize=${pageSize}`);
}

export function getRecentEstimates(count: number, user: string) {
    //get all templates from the api
    return axios.get(`${BASE_URL}/?userId=${user}&pageSize=${count}`);
}

export function getEstimate(id: string) {
    return axios.get(`${BASE_URL}/${id}`);
}

export function deleteEstimate(templateId: string) {
    return axios.delete(`${BASE_URL}/${templateId}`);
}