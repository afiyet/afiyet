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

export function completePayment(payload) {
    return axiosClient.post("/restaurants/setOrderResult", payload);
}

export function callWaiter(payload) {
    return axiosClient.post("/restaurants/callWaiter", payload);
}

export function createCashOrder(payload) {
    return axiosClient.post("/restaurants/createCashOrder", payload);
}

export function checkEmptyTableStatus(restaurantId) {
    return axiosClient.post("/restaurants/tables/emptyTable/" + restaurantId, {});
}