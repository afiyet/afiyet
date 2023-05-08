import { axiosClient } from "../axiosClient";

export function sendChangePasswordMail(email){
    return axiosClient.post("/password/forgotten/"+email+"?type=user")
}