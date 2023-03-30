import { axiosClient } from "../axiosClient";

export function login(payload) {
    return axiosClient.post("/restaurants/login", payload);
};