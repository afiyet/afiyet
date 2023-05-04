import axiosClient from "../axiosClient";

export function signup(payload) {
    return axiosClient.post("/restaurants/signup", payload);
};

export function forgotPassword(email){
    return axiosClient.post("/password/forgotten/"+email+"?type=restaurant")
}