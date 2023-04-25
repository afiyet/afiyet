import { axiosClient } from "../axiosClient";

export function getRestaurantComments(restaurantId) {
    return axiosClient.get("/restaurants/" + restaurantId + "/ratings");
};

export function addCommentToRestaurant(restaurantId, userId, payload) {
    return axiosClient.post("/ratings/" + restaurantId + "/" + userId, payload);
};