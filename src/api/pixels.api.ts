import axios from "axios";

const unsplashUrl = "https://api.pexels.com";
const API_KEY = process.env.REACT_APP_PIXELS_API_KEY

export interface Photo {
    id: number,
    url: string,
    src: {
        small: string,
    }
}

const fetchImages = (query: string) => axios
    .get(unsplashUrl + '/v1/search', {
        params: {
            query,
            size: 'small',
            orientation: "square",
        },
        headers: {
            Authorization: API_KEY
        }
    })

export default {
    fetchImages,
}
