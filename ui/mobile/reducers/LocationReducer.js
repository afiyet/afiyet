import { LocationActions } from "../actions";

const initialState = {
    longitude: "",
    latitude: "",
    altitude: "",
};

const LocationReducer = (state = initialState, action) => {
    switch (action.type) {
        case LocationActions.types.SET_DEVICE_LOCATION:
            return {
                ...state,
                longitude: action.data.longitude,
                latitude: action.data.latitude,
                altitude: action.data.altitude
            }
        default:
            return { ...state };
    }
};

export default LocationReducer;