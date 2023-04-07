import axios, { AxiosResponse } from 'axios';

const BASE_URL = "https://bryx-api-images.azurewebsites.net/api/userImages";

export const uploadImage = async (user: string, image: File): Promise<string> => {
    // Create a FormData object
    const formData = new FormData();

    // Append data to the FormData object
    formData.append("image", image);

    // Create config object
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };

    try {
        // Post to the API
        const response: AxiosResponse = await axios.post(`${BASE_URL}?userId=${user}`, formData, config);
        return response.data.imageBlobUrl;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
}


export function getUserImages(user: string) {
    //get all images for the user from the api
    return axios.get(`${BASE_URL}?userId=${user}`);
}

export function getUserImageByID(id: string) {
    return axios.get(`${BASE_URL}/${id}`);
}

export function deleteImage(id: string) {
    return axios.delete(`${BASE_URL}/${id}`);
}