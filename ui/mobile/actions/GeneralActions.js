const types = {
    SET_ONBOARDED: "SET_ONBOARDED",
    IS_LOGGED_IN: "IS_LOGGED_IN",
    RESET: "RESET"
}

const setOnboarded = (value) => {
    return {
        type: types.SET_ONBOARDED,
        data: value
    }
};

const setIsLoggedIn = (value) => {
    return {
        type: types.IS_LOGGED_IN,
        data: value
    }
};

const setReset = (value) => {
    return {
        type: types.RESET,
        data: value
    }
};

export default {
    types,
    setOnboarded,
    setIsLoggedIn,
    setReset
};