import { MenuActions } from "../actions";

const initialState = {
    menu: []
};

const MenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case MenuActions.types.ADD_CATEGORY:

            let isCategoryExist = state.menu.find((obj, index) => {
                if (obj.categoryName === action.data) {
                    return true;
                }
                return false;
            });

            if (isCategoryExist) {
                return { ...state };
            } else {
                return {
                    ...state,
                    menu: [
                        ...state.menu,
                        {
                            categoryName: action.data,
                            categoryItems: []
                        }
                    ]
                }
            }
        case MenuActions.types.ADD_MENU_ITEM:

            let newState = { ...state };

            newState.menu.map((category, index) => {
                if (category.categoryName === action.data.category) {

                    let isExist = category.categoryItems.find((item) => {
                        return (item.ID === action.data.ID) ? true : false
                    })

                    if (isExist === true) {
                        category.categoryItems = [
                            ...category.categoryItems
                        ]
                    } else if (isExist === undefined || isExist === false) {
                        category.categoryItems = [
                            ...category.categoryItems,
                            {
                                restaurantId: action.data.restaurantId,
                                name: action.data.name,
                                ingredients: action.data.ingredients,
                                picture: action.data.picture,
                                price: action.data.price,
                                ID: action.data.ID,
                                IsDisabled: action.data.IsDisabled
                            }
                        ]
                    }
                }
            });
            return {
                ...newState
            }
        case MenuActions.types.CLEAR_MENU_CACHE:
            return {
                ...state,
                menu: []
            }
        case MenuActions.types.DELETE_MENU_ITEM:
            let newStateAfterDeletion = { ...state };

            newStateAfterDeletion.menu.map((category, index) => {
                if (category.categoryName === action.data.category) {


                    let newCategoryItemsAfterDeletion = category.categoryItems.filter((item, index) => {
                        return item.ID !== action.data.ID
                    })

                    category.categoryItems = newCategoryItemsAfterDeletion;
                }
            });
            return {
                ...newStateAfterDeletion
            }
        case MenuActions.types.DELETE_CATEGORY:
            let newCategoryListAfterDeletion = { ...state }

            newCategoryListAfterDeletion.menu = newCategoryListAfterDeletion.menu.filter((item, index) => {
                return item.categoryName !== action.data.categoryName
            })

            return {
                ...newCategoryListAfterDeletion
            }
        case MenuActions.types.UPDATE_MENU_ITEM:
            let newUpdatedState = Object.assign({}, state);
            let wantedCategoryList = newUpdatedState.menu.find((category) => (category.categoryName === action.data.categoryName));

            if (wantedCategoryList !== null && wantedCategoryList !== undefined) {

                wantedCategoryList.categoryItems.map((menuItem, index) => {
                    if (menuItem.ID === action.data.ID) {
                        wantedCategoryList.categoryItems.splice(index, 1, {
                            restaurantId: action.data.restaurantId,
                            name: action.data.name,
                            ingredients: action.data.ingredients,
                            picture: action.data.picture,
                            price: action.data.price,
                            ID: action.data.ID,
                            IsDisabled: action.data.IsDisabled
                        });
                    }
                });
                return {
                    ...newUpdatedState
                }
            }
            return {
                ...state
            }
        default:
            return { ...state };
    }
};

export default MenuReducer;