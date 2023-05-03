import { OrderActions } from "../actions";

const initialState = {
    restaurantId: "",
    tableId: "",
    orderedItems: []
};

/*
  ID: item.ID,
  ingredients: item.ingredients,
  picture: item.picture,
  price: item.price,
  name: item.name,
  restaurantId: item.restaurantId
  category: item.category
*/

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case OrderActions.types.SET_BARCODE_PARAMS:
            return {
                ...state,
                restaurantId: action.data.restaurantId,
                tableId: action.data.tableId
            }
        case OrderActions.types.ADD_TO_CART:

            let newStateAfterAddToCart = { ...state };

            let isExist = newStateAfterAddToCart.orderedItems.find((item, index) => {
                return item.id === action.data.addedItem.ID;
            });

            if (isExist !== undefined) {

                isExist = {
                    ...isExist,
                    counter: isExist.counter + action.data.amountToAdd
                }

                newStateAfterAddToCart.orderedItems.map((item, index) => {
                    if (item.id === action.data.addedItem.ID) {
                        newStateAfterAddToCart.orderedItems.push(isExist);
                        newStateAfterAddToCart.orderedItems.splice(index, 1);
                    }
                });
            } else {
                newStateAfterAddToCart.orderedItems.push({
                    id: action.data.addedItem.ID,
                    name: action.data.addedItem.name,
                    category: action.data.addedItem.category,
                    price: action.data.addedItem.price,
                    counter: action.data.amountToAdd,
                    restaurantId: action.data.addedItem.restaurantId,
                    picture: action.data.addedItem.picture
                }
                );
            }

            return {
                ...newStateAfterAddToCart
            }
        case OrderActions.types.REMOVE_FROM_CARD:
            state.orderedItems.map((item, index) => {
                if (item.id === action.data) {
                    state.orderedItems.splice(index, 1);
                }
            });
            console.log("remove");
            return {
                ...state
            };
        case OrderActions.types.INCREASE_COUNT_OF_ORDERED_ITEM:

            state.orderedItems.map((item, index) => {
                if (item.id === action.data) {
                    item.counter = item.counter + 1
                }
            });
            //console.log("aaa");
            return {
                ...state
            };
        case OrderActions.types.DECREASE_COUNT_OF_ORDERED_ITEM:
            console.log(action);
            state.orderedItems.map((item, index) => {
                if (item.id === action.data) {
                    if (item.counter > 1) {
                        item.counter = item.counter - 1
                    } else {
                        state.orderedItems.splice(index, 1);
                    }
                }
            });

            return {
                ...state
            };
        case OrderActions.types.RESET:
            return {
                restaurantId: "",
                tableId: "",
                orderedItems: []
            }
        case OrderActions.types.UPDATE_PRICE:
            state.orderedItems.map((item, index) => {
                if (item.id === action.data.id) {
                    state.orderedItems.splice(index, 1, {
                        ...item,
                        price: action.data.price
                    });
                }
            });
            return {
                ...state
            }
        default:
            return { ...state };
    }
};

export default OrderReducer;