import axios from 'axios';

const BASE_URL = "https://bryx-api-estimates.azurewebsites.net/api/estimateComments";

export async function createEstimateComment(userEmail: string, userName:string, estimateId: string, comment: string, token: string) {
    //Create Body
    const body = {
        userEmail: userEmail,
        userName: userName,
        estimateId: estimateId,
        comment: comment,
    }
    return axios.post(`${BASE_URL}`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function getEstimateComments(estimateId: string, token: string) {
    //get all templates from the api
    return axios.get(`${BASE_URL}?estimateId=${estimateId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export function deleteEstimateComment(estimateCommentId: string, token: string) {
    return axios.delete(`${BASE_URL}/${estimateCommentId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}