const types = {
    SET_RESTAURANT: "SET_RESTAURANT"
}

const setRestaurant = (value) => {
    return {
        type: types.SET_RESTAURANT,
        data: value
    }
};


export default {
    types,
    setRestaurant
};