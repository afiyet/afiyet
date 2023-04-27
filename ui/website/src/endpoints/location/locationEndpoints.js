import axiosClient from "../axiosClient";

export function getLocation(restaurantId) {
    return axiosClient.get("/locations/" + restaurantId);
};