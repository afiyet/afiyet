import axios from "axios";

/**
 * baseURL'i düzenle 
 * 
*/

const axiosClient = axios.create({
    baseURL: "localhost:8000",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default axiosClient;