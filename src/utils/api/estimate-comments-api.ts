import axios from 'axios';
import { EstimateCommentData } from '../types/EstimateInterfaces';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/estimateComments";

export async function createEstimateComment(userName:string, estimateId: string, comment: string, userPic:string, token: string) {
    //Create Body
    const body = {
        userName: userName,
        userPic: userPic,
        estimateId: estimateId,
        comment: comment,
    }
    const response = await axios.post(`${BASE_URL}`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.estimateComment as EstimateCommentData;
}

export async function getEstimateComments(estimateId: string, token: string) {
    //get all templates from the api
    const response = await axios.get(`${BASE_URL}?estimateId=${estimateId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data as EstimateCommentData[];
}

export async function deleteEstimateComment(estimateCommentId: string, token: string) {
    await axios.delete(`${BASE_URL}/${estimateCommentId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}