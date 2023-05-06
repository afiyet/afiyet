import  axiosClient  from "../axiosClient";

export function getRestaurantOrders(restaurantId) {
    return axiosClient.get("/restaurants/" + restaurantId + "/orders");
};

export function deleteOrder(orderId) {
    return axiosClient.delete("/restaurants/orders/" + orderId);
};

export function completeCashPayment(payload) {
    return axiosClient.post("/restaurants/completeCashPayment", payload);
};

export function acceptCashPayment(payload) {
    return axiosClient.post("/restaurants/acceptCashPayment", payload);
};