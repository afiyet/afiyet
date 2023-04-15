import { OrderActions } from "../actions";

const initialState = {
    restaurantId: "",
    tableId: "",
    orderedItems: []
};

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case OrderActions.types.SET_BARCODE_PARAMS:
            return {
                ...state,
                restaurantId: action.data.restaurantId,
                tableId: action.data.tableId
            }
        case OrderActions.types.ADD_TO_CART:
            return {
                ...state,
                orderedItems: []
            }
        default:
            return { ...state };
    }
};

export default OrderReducer;