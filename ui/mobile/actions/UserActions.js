const types = {
    SET_USER: "SET_USER",
    RESET: "RESET"
}

const setUser = (value) => {
    return {
        type: types.SET_USER,
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
    setUser,
    setReset
};