import  axiosClient  from "./axiosClient";
import { getTables, deleteTable, renameTable, addTable } from "./tables/tablesEndpoints";
import { login } from "./login/loginEndpoints";

export {
    axiosClient,
    getTables,
    login,
    deleteTable,
    renameTable,
    addTable
};