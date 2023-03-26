import axiosClient from "../axiosClient";

export function getSearchResults(data) {
    return axiosClient.post("/restaurant/search/" + data);
};