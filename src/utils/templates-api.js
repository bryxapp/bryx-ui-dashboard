//Methods for creating and updating templates using axios

import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/templates';

export function createTemplate(template) {
    return axios.post(BASE_URL, template);
}

export function updateTemplate(template) {

    return axios.put(`${BASE_URL}/${template._id}`, template);
}

export function getTemplates() {

    //Create a dummy JARRAY of templates
    const templates = [
        {
            _id: '123',
            name: 'Template 1',
            description: 'Template 1 description',
            fields: [
                {
                    name: 'Field 1',
                    type: 'text',
                    required: true
                },
                {
                    name: 'Field 2',
                    type: 'text',
                    required: false
                }
            ]
        },
        {
            _id: '456',
            name: 'Template 2',
            description: 'Template 2 description',
            fields: [
                {
                    name: 'Field 1',
                    type: 'text',
                    required: true
                },
                {
                    name: 'Field 2',
                    type: 'text',
                    required: false
                }
            ]
        },
        {
            _id: '789',
            name: 'Template 3',
            description: 'Template 3 description',
            fields: [
                {
                    name: 'Field 1',
                    type: 'text',
                    required: true
                },
                {
                    name: 'Field 2',
                    type: 'text',
                    required: false
                }
            ]
        }
    ];

    return templates;
    // return axios.get(BASE_URL);
}

export function getTemplate(id) {
    return axios.get(`${BASE_URL}/${id}`);
}


export function deleteTemplate(template) {
    return axios.delete(`${BASE_URL}/${template._id}`);
}



