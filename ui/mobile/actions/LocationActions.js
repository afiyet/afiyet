const types = {
    SET_DEVICE_LOCATION: "SET_DEVICE_LOCATION"
}

const setDeviceLocation = (value) => {
    return {
        type: typescale.SET_DEVICE_LOCATION,
        data: value
    }
};


export default {
    types,
    setDeviceLocation
};