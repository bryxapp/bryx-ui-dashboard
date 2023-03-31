import axios from 'axios';

const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

export async function searchUnsplashImages(query: string, page = 1, perPage = 4) {
    try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query,
                page,
                per_page: perPage,
            },
            headers: {
                Authorization: `Client-ID ${unsplashAccessKey}`,
            },
        });

        if (response.status === 200) {
            return response.data.results;
        }
    } catch (error) {
        console.error('Error fetching images from Unsplash:', error);
    }

    return [];
}
