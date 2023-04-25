import  axiosClient  from "./axiosClient";
import { getTables, deleteTable, renameTable, addTable } from "./tables/tablesEndpoints";
import { login } from "./login/loginEndpoints";
import { addMenuItem, deleteMenuItem, getRestaurantMenu, updateMenuItem } from "./menu/menuEndpoints";
import { getComments } from "./comments/commentEndpoints";
import { updateRestaurantInfo, getRestaurantInfo } from "./main/mainPageEndpoints";
 
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
    getRestaurantInfo
};