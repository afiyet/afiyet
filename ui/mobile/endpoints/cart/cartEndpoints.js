import axiosClient from "../axiosClient";

export function initializePayment(payload) {
    return axiosClient.post("/restaurants/orderPayment", payload);
};