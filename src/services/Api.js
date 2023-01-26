import axios from "axios"
import { getUserData, storeUserData } from './Storage'
import { json, Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2'

axios.defaults.baseURL = "http://10.1.23.150:4000";
const API_KEY = "%YOUR_FIREBASE_API_KEY%"
const REGISTER_URL = 'register';
const LOGIN_URL = 'api/login/';
const USER_DETAILS_URL = `/accounts:lookup?key=${API_KEY}`;
const tokenExpireMin = 10;

export const RegisterApi = (inputs) => {
    let data = { userId: inputs.userId, orgMSP: 'Org1MSP', role:'client', password: inputs.password }
    return axios.post(REGISTER_URL, data)
}
export const LoginApi = (inputs) => {
    let data = { username: inputs.username, password: inputs.password }
    return  axios.post(LOGIN_URL, data);   
}
export const UserDetailsApi = () => {
    let data = { idToken: getUserData() }
    return axios.post(USER_DETAILS_URL, data)
}