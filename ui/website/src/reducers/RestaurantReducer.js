import { RestaurantActions } from "../actions";

const initialState = {
    restaurantId: "",
    name: "",
    address: "",
    category: "",
    location: "",
    password: "",
    mail: ""
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
                mail: action.data.mail
            }
        default:
            return { ...state };
    }
};

export default RestaurantReducer;