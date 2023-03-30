import { 
    axiosClient,
    axiosClientWebViewAWS,
    axiosClientCheckPaymentResult
} from "../axiosClient";

export function initializePayment(payload) {
    return axiosClient.post("/restaurants/orderPayment", payload);
};

export function getWebViewUrlFromAWS(payload) {
    return axiosClientWebViewAWS.post("", payload);
}

export function getPaymentResult(payload) {
    return axiosClientCheckPaymentResult.post("", payload);
}