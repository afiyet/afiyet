const types = {
    ADD_MENU_ITEM: "ADD_MENU_ITEM",
    ADD_CATEGORY: "ADD_CATEGORY",
    CLEAR_MENU_CACHE: "CLEAR_MENU_CACHE",
    DELETE_MENU_ITEM: "DELETE_MENU_ITEM",
    DELETE_CATEGORY: "DELETE_CATEGORY",
    UPDATE_MENU_ITEM: "UPDATE_MENU_ITEM"
}

const addMenuItem = (value) => {
    return {
        type: types.ADD_MENU_ITEM,
        data: value
    }
};

const addCategory = (value) => {
    return {
        type: types.ADD_CATEGORY,
        data: value
    }
};

const clearMenuCache = () => {
    return {
        type: types.CLEAR_MENU_CACHE
    }
}

const deleteMenuItem = (value) => {
    return {
        type: types.DELETE_MENU_ITEM,
        data: value
    }
}

const deleteCategory = (value) => {
    return {
        type: types.DELETE_CATEGORY,
        data: value
    }
}

const updateMenuItem = (value) => {
    return {
        type: types.UPDATE_MENU_ITEM,
        data: value
    }
}

export default {
    types,
    addMenuItem,
    addCategory,
    clearMenuCache,
    deleteMenuItem,
    deleteCategory,
    updateMenuItem
};