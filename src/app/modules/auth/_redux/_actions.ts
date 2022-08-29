import axios from "axios";
import { AuthModel, UserModel } from "./_models";

export const LOGIN_URL = "api/auth/login";
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(email: string, password: string) {
    return axios.post<AuthModel>(LOGIN_URL, {
        email,
        password,
    })
}

export function register(
    email: string,
    firstname: string,
    lastname: string,
    password: string,
    password_confirmation: string
) {
    return axios.post(REGISTER_URL, {
        email,
        first_name: firstname,
        last_name: lastname,
        password,
        password_confirmation,
    })
}

export function requestPassword(email: string) {
    return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
        email,
    })
}

export function getUserByToken(token: string) {
    return axios.post<UserModel>(ME_URL, {authToken: token})
}
