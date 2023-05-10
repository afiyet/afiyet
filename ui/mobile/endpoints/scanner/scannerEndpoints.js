import { axiosClient } from "../axiosClient";

export function doesHaveRemoteOrderOnTable(tableId){
    return axiosClient.post("/restaurants/tables/doesHaveRemoteOrder/" + tableId);
}