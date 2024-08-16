import Cookies from 'js-cookie';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true,
    withXSRFToken: true,
});

export default axiosInstance;
