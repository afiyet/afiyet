const types = {
    SET_DEVICE_LOCATION: "SET_DEVICE_LOCATION",
    RESET: "RESET"
}

const setDeviceLocation = (value) => {
    return {
        type: types.SET_DEVICE_LOCATION,
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
    setDeviceLocation,
    setReset
};