const types = {
    SET_BARCODE_PARAMS: "SET_BARCODE_PARAMS",
    UNSET_BARCODE_PARAMS: "UNSET_BARCODE_PARAMS",
    ADD_TO_CART: "ADD_TO_CART",
    REMOVE_FROM_CARD: "REMOVE_FROM_CARD",
    INCREASE_COUNT_OF_ORDERED_ITEM: "INCREASE_COUNT_OF_ORDERED_ITEM",
    DECREASE_COUNT_OF_ORDERED_ITEM: "DECREASE_COUNT_OF_ORDERED_ITEM",
    RESET: "RESET"
}

const setBarcodeParams = (value) => {
    return {
        type: types.SET_BARCODE_PARAMS,
        data: value
    }
};

const addToCart = (value) => {
    return {
        type: types.ADD_TO_CART,
        data: value
    }
};

const removeFromCart = (value) => {
    return {
        type: types.REMOVE_FROM_CARD,
        data: value
    }
}

const decreaseCountOfOrderedItem = (value) => {
    return {
        type: types.DECREASE_COUNT_OF_ORDERED_ITEM,
        data: value
    }
}

const increaseCountOfOrderedItem = (value) => {
    return {
        type: types.INCREASE_COUNT_OF_ORDERED_ITEM,
        data: value
    }
}

const setReset = (value) => {
    return {
        type: types.RESET,
        data: value
    }
}


export default {
    types,
    setBarcodeParams,
    addToCart,
    removeFromCart,
    decreaseCountOfOrderedItem,
    increaseCountOfOrderedItem,
    setReset
};