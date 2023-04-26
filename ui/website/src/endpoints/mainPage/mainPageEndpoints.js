import axiosClient from "../axiosClient";

export function updateRestaurantInfo(restaurantId, payload) {
    return axiosClient.put("/restaurants/" + restaurantId, payload);
};

export function getRestaurantInfo(restaurantId) {
    return axiosClient.get("/restaurants/" + restaurantId);
};