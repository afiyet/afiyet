const types = {
    ADD_TO_RECENTLY_SEARCHED: "ADD_TO_RECENTLY_SEARCHED",
    REMOVE_FROM_RECENTLY_SEARCHED: "REMOVE_FROM_RECENTLY_SEARCHED" 
}

const addToRecentlySearched = (value) => {
    return {
        type: types.ADD_TO_RECENTLY_SEARCHED,
        data: value
    }
};

const removeFromRecentlySearched = (value) => {
    return {
        type: types.REMOVE_FROM_RECENTLY_SEARCHED,
        data: value
    }
};


export default {
    types,
    addToRecentlySearched,
    removeFromRecentlySearched
};