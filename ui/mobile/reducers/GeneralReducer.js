import { GeneralActions } from "../actions";

const initialState = {
    onboarded: false,
};

const GeneralReducer = (state = initialState, action) => {
    switch (action.type) {
        case GeneralActions.types.SET_ONBOARDED:
            return {
                ...state,
                onboarded: action.data
            };
        default:
            return {...state};
    }
};

export default GeneralReducer;