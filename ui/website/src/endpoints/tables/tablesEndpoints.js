import  axiosClient  from "../axiosClient";

export function getTables(tableId) {
    return axiosClient.get("/restaurants/" + tableId + "/tables");
};

export function deleteTable(tableId) {
    return axiosClient.delete("/restaurants/tables/" + tableId);
}

export function renameTable(tableId, payload) {
    return axiosClient.put("/restaurants/tables/"+ tableId, payload);
}

export function addTable(payload) {
    return axiosClient.post("/restaurants/tables", payload);
}