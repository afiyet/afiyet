import  axiosClient  from "./axiosClient";
import { getTables, deleteTable, renameTable, addTable } from "./tables/tablesEndpoints";
import { login } from "./login/loginEndpoints";
import { addMenuItem, deleteMenuItem, getRestaurantMenu, updateMenuItem } from "./menu/menuEndpoints";
import { getComments } from "./comments/commentEndpoints";
import { getLocation } from "./location/locationEndpoints";
 
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
    getLocation
};