import axiosClient from "../axiosClient";

export function login(data) {
    return axiosClient.post("/users/login", data);
}

export function signUp(data) {
    return axiosClient.post("/users/signup", data);
}