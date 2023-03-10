//Methods for creating and updating templates using axios

import axios from 'axios';
import { createStage } from './canvas-util';
import { getPDFHeight, getPDFWidth } from './page-util';

const BASE_URL = "https://bryx-api-estimates.azurewebsites.net/api/estimates";

export function createEstimate(canvasDesign: any, templateId: string, estimateName: string, fieldValues: string[], user:string) {
    const estimateImgObj = createStage(canvasDesign, fieldValues);
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

export function getEstimates() {
    //get all templates from the api
    return axios.get(`${BASE_URL}`);
}

export function getRecentEstimates(count: number) {
    //get all templates from the api
    return axios.get(`${BASE_URL}/recent/${count}`);
}

export function getEstimate(id: string) {
    return axios.get(`${BASE_URL}/${id}`);
}

export function deleteEstimate(templateId: string) {
    return axios.delete(`${BASE_URL}/${templateId}`);
}