import axios, { AxiosResponse } from 'axios';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/userImages";

export const uploadImage = async (image: File, token:string): Promise<string> => {
    // Create a FormData object
    const formData = new FormData();

    // Append data to the FormData object
    formData.append("image", image);

    // Create config object
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
        },
    };

    try {
        // Post to the API
        const response: AxiosResponse = await axios.post(`${BASE_URL}`, formData, config);
        return response.data.imageBlobUrl;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}


export function getUserImages(token: string) {
    //get all images for the user from the api
    return axios.get(`${BASE_URL}?`, { headers: { 'Authorization': `Bearer ${token}` } });
}

export function getUserImageByID(id: string, token: string) {
    return axios.get(`${BASE_URL}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
}

export function deleteImage(id: string, token: string) {
    return axios.delete(`${BASE_URL}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
}

export const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width * 2, height: img.height * 2 });
        img.onerror = reject;
        img.src = url;
    });
};