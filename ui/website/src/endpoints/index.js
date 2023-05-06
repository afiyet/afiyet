import  axiosClient  from "./axiosClient";
import { getTables, deleteTable, renameTable, addTable } from "./tables/tablesEndpoints";
import { login } from "./login/loginEndpoints";
import { addMenuItem, deleteMenuItem, getRestaurantMenu, updateMenuItem } from "./menu/menuEndpoints";
import { getComments } from "./comments/commentEndpoints";
import { updateRestaurantInfo, getRestaurantInfo } from "./mainPage/mainPageEndpoints";
import { getRestaurantOrders, deleteOrder, completeCashPayment, acceptCashPayment } from "./order/orderEndpoints";
import { signup, forgotPassword } from "./signup/signupEndpoints";

export {
    axiosClient,
    getTables,
    login,
    deleteTable,
    renameTable,
    addTable,
    addMenuItem, 
    deleteMenuItem, 
    getRestaurantMenu, 
    updateMenuItem,
    getComments,
    updateRestaurantInfo,
    getRestaurantInfo,
    getRestaurantOrders,
    deleteOrder,
    signup,
    completeCashPayment,
    forgotPassword,
    acceptCashPayment
};