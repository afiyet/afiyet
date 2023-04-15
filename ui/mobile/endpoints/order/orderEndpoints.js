import { axiosClient } from "../axiosClient";

export function getRestaurantMenu(restaurantId) {
    return axiosClient.get("/restaurants/" + restaurantId + "/dishes");
};