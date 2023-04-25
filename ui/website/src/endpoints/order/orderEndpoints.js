import  axiosClient  from "../axiosClient";

export function getRestaurantOrders(restaurantId) {
    return axiosClient.get("/restaurants/" + restaurantId + "/orders");
};
