//Methods for creating and updating templates using axios

import axios from 'axios';
import { createStage } from './canvas-util';

const BASE_URL = "https://bryx-api-estimates.azurewebsites.net/api/estimates";

export function createEstimate(canvasDesign: any, templateId: string, estimateName: string) {
    //Get User
    const user = getUser();
    const estimateImgObj = createStage(canvasDesign);
    //Create Body
    const body = {
        user: user,
        templateId: templateId,
        estimateName: estimateName,
        estimateImgObj: estimateImgObj
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

function getUser() {
    return "bthomas_test"
    //return JSON.parse(localStorage.getItem('user'));
}