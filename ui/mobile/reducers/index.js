import { combineReducers } from "redux";

import GeneralReducer from "./GeneralReducer";
import UserReducer from "./UserReducer";
import LocationReducer from "./LocationReducer";
import SearchReducer from "./SearchReducer";
import OrderReducer from "./OrderReducer";

export default combineReducers({
    generalState: GeneralReducer,
    userState: UserReducer,
    locationState: LocationReducer,
    searchState: SearchReducer,
    orderState: OrderReducer
});