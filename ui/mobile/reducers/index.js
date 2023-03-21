import { combineReducers } from "redux";

import GeneralReducer from "./GeneralReducer";
import UserReducer from "./UserReducer";
import LocationReducer from "./LocationReducer";

export default combineReducers({
    generalState: GeneralReducer,
    userState: UserReducer,
    locationState: LocationReducer
});