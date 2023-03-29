const types = {
    SET_USER: "SET_USER"
}

const setUser = (value) => {
    return {
        type: types.SET_USER,
        data: value
    }
};


export default {
    types,
    setUser
};