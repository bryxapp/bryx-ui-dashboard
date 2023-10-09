//Methods for creating and updating templates using axios

import axios from 'axios';

const BASE_URL = "https://bryx-api.azurewebsites.net/api/checkout";

export async function createCheckoutSession(priceId: string) {
    // Get all templates from the api
    try {
        const response = await axios.post(BASE_URL, { priceId: priceId });
        return response.data;
    }
    catch (error) {
        console.log(error);
    }
    return null;
}

