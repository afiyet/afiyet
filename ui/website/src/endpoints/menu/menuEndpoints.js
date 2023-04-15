import axiosClient from "../axiosClient";


//e.POST("/dishes", dishHandler.Add)
export function addMenuItem(payload) {
    return axiosClient.post("/dishes", payload);
};

//e.DELETE("/dishes/:id", dishHandler.Delete)
export function deleteMenuItem(dishId) {
    return axiosClient.delete("/dishes/" + dishId);
};

//e.PUT("/dishes/:id", dishHandler.Update)
export function updateMenuItem(dishId, payload) {
    return axiosClient.put("/dishes/" + dishId, payload);
};

//e.GET("/restaurants/:id/dishes", restaurantHandler.GetDishes)
export function getRestaurantMenu(restaurantId) {
    return axiosClient.get("/restaurants/" + restaurantId + "/dishes");
};