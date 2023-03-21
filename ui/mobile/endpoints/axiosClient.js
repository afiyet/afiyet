import axios from "axios";

/**
 * baseURL'i düzenle 
 * 
*/

const axiosClient = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default axiosClient;