//Methods for creating and updating templates using axios

import axios from 'axios';

const BASE_URL = "https://bryx-api-templates.azurewebsites.net/api/templates";

export function postNewTemplate(canvasDesign, friendlyName) {
    //Get User 
    const user = getUser();
    //Create Body
    const body = {
        user: user,
        friendlyName: friendlyName,
        canvasDesign: canvasDesign
    }

    return axios.post(`${BASE_URL}?code=${process.env.REACT_APP_TEMPLATES_API_KEY}`, body);
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

    return axios.put(`${BASE_URL}${templateId}?code=${process.env.REACT_APP_TEMPLATES_API_KEY}`, body);
}

export function getTemplates() {
    //get all templates from the api
    console.log(process.env)
    return axios.get(`${BASE_URL}?code=${process.env.REACT_APP_TEMPLATES_API_KEY}`);
}

export function getTemplate(id) {
    return axios.get(`${BASE_URL}/${id}?code=${process.env.REACT_APP_TEMPLATES_API_KEY}`);
}

export function deleteTemplate(templateId) {
    console.log(`${BASE_URL}/${templateId}?code=${process.env.REACT_APP_TEMPLATES_API_KEY}`)
    return axios.delete(`${BASE_URL}/${templateId}?code=${process.env.REACT_APP_TEMPLATES_API_KEY}`);
}

function getUser() {
    return "bthomas_test"
    //return JSON.parse(localStorage.getItem('user'));
}