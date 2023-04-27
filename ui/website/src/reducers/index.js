import { combineReducers } from "redux";
import RestaurantReducer from "./RestaurantReducer";
import MenuReducer from "./MenuReducer";

export default combineReducers({
    restaurantState: RestaurantReducer,
    menuState: MenuReducer,
});