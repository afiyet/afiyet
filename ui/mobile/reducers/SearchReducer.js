import { SearchActions } from "../actions";

const initialState = {
    recentlySearched: [],
};

const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SearchActions.types.ADD_TO_RECENTLY_SEARCHED:
            if (!state.recentlySearched.includes(action.data) && action.data.trim().length > 0) {
                return {
                    ...state,
                    recentlySearched: [...state.recentlySearched, action.data],
                }
            }
            return { ...state };
        case SearchActions.types.REMOVE_FROM_RECENTLY_SEARCHED:
            state.recentlySearched.splice(action.data, 1);
            return {
                ...state
            }
        case SearchActions.types.RESET:
            return {
                recentlySearched: [],
            }
        default:
            return { ...state };
    }
};

export default SearchReducer;