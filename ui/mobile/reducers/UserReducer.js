import { UserActions } from "../actions";

const initialState = {
    userId: "",
    name: "",
    surname: "",
    mail: "",
};

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActions.types.SET_USER:
            return {
                ...state,
                userId: action.data.ID,
                name: action.data.name,
                surname: action.data.surname,
                mail: action.data.mail
            }
        case UserActions.types.RESET:
            return {
                userId: "",
                name: "",
                surname: "",
                mail: "",
            }
        default:
            return { ...state };
    }
};

export default UserReducer;