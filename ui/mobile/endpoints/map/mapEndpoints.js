import axiosClient from "../axiosClient";

export function getMarkers() {
    return axiosClient.get("/locations");
};