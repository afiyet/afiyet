import { axiosClient } from "../axiosClient";

export function getRestaurantComments(restaurantId) {
    return axiosClient.get("/restaurants/" + restaurantId + "/ratings");
};
