//Methods for creating and updating templates using axios

import axios from 'axios';

const BASE_URL = "https://bryx-api-estimates.azurewebsites.net/api/estimates";


export function createEstimate(canvasDesign, templateName, estimateName) {
    //Get User
    const user = getUser();
    //Create Body
    const body = {
        user: user,
        template: templateName,
        estiamteName: estimateName,
        canvasDesign: canvasDesign
    }
    return axios.post(`${BASE_URL}`, body);
}

export function getTemplates() {
    //get all templates from the api
    return axios.get(`${BASE_URL}`);
}

export function getRecentTemplates(count) {
    //get all templates from the api
    return axios.get(`${BASE_URL}/recent/${count}`);
}

export function getTemplate(id) {
    return axios.get(`${BASE_URL}/${id}`);
}

export function deleteTemplate(templateId) {
    return axios.delete(`${BASE_URL}/${templateId}`);
}

function getUser() {
    return "bthomas_test"
    //return JSON.parse(localStorage.getItem('user'));
}