import axiosClient from "../axiosClient";

export function signup(payload) {
    return axiosClient.post("/restaurants/signup", payload);
};