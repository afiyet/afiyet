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

            let newStateAfterAddToCart = {...state};

            let isExist = newStateAfterAddToCart.orderedItems.find((item, index) => {
                return item.id === action.data.ID;
            });

            if (isExist !== undefined) {
               
                isExist = {
                    ...isExist,
                    counter: isExist.counter + 1
                }

                newStateAfterAddToCart.orderedItems.map((item, index) => {
                    if (item.id === action.data.ID) {
                        newStateAfterAddToCart.orderedItems.push(isExist);
                        newStateAfterAddToCart.orderedItems.splice(index,1);
                    }
                });
            } else {
                newStateAfterAddToCart.orderedItems.push({
                        id: action.data.ID,
                        name: action.data.name,
                        category: action.data.category,
                        price: action.data.price,
                        counter: 1
                    }
                );
            }

            return {
                ...newStateAfterAddToCart
            }
        default:
            return { ...state };
    }
};

export default OrderReducer;