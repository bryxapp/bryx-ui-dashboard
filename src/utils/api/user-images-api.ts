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

export async function getUserImages(token: string) {
    //get all images for the user from the api
    const response = await axios.get(`${BASE_URL}?`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export async function getUserImageByID(id: string, token: string) {
    const response = await axios.get(`${BASE_URL}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
    return response.data;
}

export async function deleteImage(id: string, token: string) {
    await axios.delete(`${BASE_URL}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
}

export const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width * 2, height: img.height * 2 });
        img.onerror = reject;
        img.src = url;
    });
};