import axios from "axios";
//import { applyInterceptors } from "./request";

//env로 숨긴 url 주소 (backend 주소 <-> front 주소)
const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

const defaultInstance = axios.create({
    baseURL: BASE_URL,
});

const userInstance = axios.create(defaultInstance.defaults);
//userInstance.defaults.baseURL += "/example"; 공통된 url있으면 추가

export {
    defaultInstance,
    userInstance,
};