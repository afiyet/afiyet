import { UserActions } from "../actions";

const initialState = {
    userId: "",
    name: "",
    address: "",
    category: "",
    location: "",
    password: "",
    mail: ""
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActions.types.SET_USER:
            return {
                ...state,
                userId: action.data.ID,
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

export default UserReducer;