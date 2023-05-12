import axios from 'axios';

const BASE_URL = "https://bryx-api-estimates.azurewebsites.net/api/estimateComments";

export async function createEstimateComment(user: string, estimateId: string, comment: string) {
    //Create Body
    const body = {
        user: user,
        estimateId: estimateId,
        comment: comment,
    }
    return axios.post(`${BASE_URL}`, body);
}

export function getEstimateComments(estimateId: string) {
    //get all templates from the api
    return axios.get(`${BASE_URL}?estimateId=${estimateId}`);
}

export function deleteEstimateComment(estimateCommentId: string) {
    return axios.delete(`${BASE_URL}/${estimateCommentId}`);
}