import axios from 'axios';
import { mainAPI } from '.';
const host = process.env.REACT_APP_ENVIRONMENT === "development"
    ? mainAPI.LOCALHOST_HOST
    : mainAPI.CLOUD_HOST;
export default axios.create({
    baseURL: host
})
export const privateAxios = axios.create({
    baseURL: host
})