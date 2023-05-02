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

const axiosClientWebViewAWS = axios.create({
    baseURL: "https://lz4fmbvlq6hb6tmzm7vdzwm7ry0iaaar.lambda-url.eu-central-1.on.aws/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const axiosClientCheckPaymentResult = axios.create({
    baseURL: "https://reot3nxkw2g4yofbhaiz4s5v7i0obstg.lambda-url.eu-central-1.on.aws/",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});


export {
    axiosClient,
    axiosClientWebViewAWS,
    axiosClientCheckPaymentResult
};