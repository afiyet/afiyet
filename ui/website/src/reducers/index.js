import { combineReducers } from "redux";
import RestaurantReducer from "./RestaurantReducer";

export default combineReducers({
    restaurantState: RestaurantReducer
});