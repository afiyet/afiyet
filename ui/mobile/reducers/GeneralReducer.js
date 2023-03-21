import { GeneralActions } from "../actions";

const initialState = {
    onboarded: false,
    isLoggedIn: false,
};

const GeneralReducer = (state = initialState, action) => {
    switch (action.type) {
        case GeneralActions.types.SET_ONBOARDED:
            return {
                ...state,
                onboarded: action.data
            };
        case GeneralActions.types.IS_LOGGED_IN:
            return {
                ...state,
                isLoggedIn: action.data
            };
        default:
            return {...state};
    }
};

export default GeneralReducer;