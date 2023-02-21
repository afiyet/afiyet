import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://192.168.1.25:8080",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default axiosClient;