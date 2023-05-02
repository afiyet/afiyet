import  axiosClient  from "../axiosClient";

export function getRestaurantOrders(restaurantId) {
    return axiosClient.get("/restaurants/" + restaurantId + "/orders");
};

export function deleteOrder(orderId) {
    return axiosClient.delete("/restaurants/orders/" + orderId);
};
