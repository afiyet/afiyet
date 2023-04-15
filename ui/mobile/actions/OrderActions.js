const types = {
    SET_BARCODE_PARAMS: "SET_BARCODE_PARAMS",
    UNSET_BARCODE_PARAMS: "UNSET_BARCODE_PARAMS",
    ADD_TO_CART: "ADD_TO_CART",
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


export default {
    types,
    setBarcodeParams,
    addToCart
};