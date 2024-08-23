import axios from "axios";
//import { applyInterceptors } from "./request";

//env로 숨긴 url 주소 (backend 주소 <-> front 주소)
const BASE_URL = process.env.REACT_APP_BACKEND_SERVER_URL;

const defaultInstance = axios.create({
    baseURL: BASE_URL,
});

const exampleInstance = axios.create(defaultInstance.defaults);
exampleInstance.defaults.baseURL += "/example";

export {
    defaultInstance,
    exampleInstance,
};