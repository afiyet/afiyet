import axios from "axios";

/**
 * baseURL'i düzenle 
 * 
*/

const axiosClient = axios.create({
    baseURL: "https://backend.afiyet.site",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default axiosClient;