import { RestaurantActions } from "../actions";

const initialState = {
    restaurantId: "",
    name: "",
    address: "",
    category: "",
    location: "",
    password: "",
    mail: "",
    picture: "",
    latitude: "",
    longitude: ""
};

const RestaurantReducer = (state = initialState, action) => {
    switch (action.type) {
        case RestaurantActions.types.SET_RESTAURANT:
            return {
                ...state,
                restaurantId: action.data.ID,
                name: action.data.name,
                address: action.data.address,
                category: action.data.category,
                location: action.data.location,
                password: action.data.password,
                mail: action.data.mail,
                picture: action.data.picture
            }
        case RestaurantActions.types.SET_LAT_LON:
            return {
                ...state,
                latitude: action.data.Latitude,
                longitude: action.data.Longitude
            }
        default:
            return { ...state };
    }
};

export default RestaurantReducer;