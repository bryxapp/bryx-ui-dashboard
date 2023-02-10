//Methods for creating and updating templates using axios

import axios from 'axios';

const BASE_URL = "https://bryx-api-templates.azurewebsites.net/api/templates";

export function createTemplate(canvasDesign, friendlyName) {
    //Get User 
    const user = getUser();
    //Create Body
    const body = {
        user: user,
        friendlyName: friendlyName,
        canvasDesign: canvasDesign
    }

    return axios.post(`${BASE_URL}`, body);
}

export function updateTemplate(templateId, canvasDesign, friendlyName) {
    //Get User 
    const user = getUser();
    //Create Body
    const body = {
        user: user,
        friendlyName: friendlyName,
        canvasDesign: canvasDesign
    }

    return axios.put(`${BASE_URL}/${templateId}`, body);
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