import { axiosClient } from "../axiosClient";

export function getRestaurantMenu(restaurantId) {
    return axiosClient.get("/restaurants/" + restaurantId + "/dishes");
};

export function getRestaurants() {
    return axiosClient.get("/locations");
};

export function getRestaurant(restaurantId) {
    return axiosClient.get("/locations/" + restaurantId);
};

export function getRestaurantsWithCampaignPicture() {
    return axiosClient.get("/restaurants");
}