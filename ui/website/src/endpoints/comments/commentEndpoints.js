import axiosClient from "../axiosClient";

export function getComments(restaurantId) {
    return axiosClient.get("/restaurants/" + restaurantId + "/ratings");
};

export function getAveragePoint(restaurantId) {
    return axiosClient.get("/restaurants/" + restaurantId + "/ratings/get-average");
}