const types = {
    SET_RESTAURANT: "SET_RESTAURANT",
    SET_LAT_LON: "SET_LAT_LON"
}

const setRestaurant = (value) => {
    return {
        type: types.SET_RESTAURANT,
        data: value
    }
};

const setLatLon = (value) => {
    return {
        type: types.SET_LAT_LON,
        data: value
    }
};


export default {
    types,
    setRestaurant,
    setLatLon
};