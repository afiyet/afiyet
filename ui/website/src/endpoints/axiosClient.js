import axios from "axios";

/**
 * baseURL'i düzenle 
 * 
*/

const axiosClient = axios.create({
    baseURL: "http://52.57.220.100",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default axiosClient;