import  axiosClient  from "../axiosClient";

export function getTables(tableId) {
    return axiosClient.get("/restaurants/" + tableId + "/tables");
};