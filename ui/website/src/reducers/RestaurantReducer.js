import { RestaurantActions } from "../actions";

const initialState = {
    restaurantId: "",
    name: "",
    address: "",
    category: "",
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
                password: action.data.password,
                mail: action.data.mail,
                picture: action.data.picture,
                latitude: action.data.Latitude,
                longitude: action.data.Longitude
            }
        default:
            return { ...state };
    }
};

export default RestaurantReducer;