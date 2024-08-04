import Cookies from 'js-cookie';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: '/api',
    withCredentials: true,
    withXSRFToken: true,
});

const onRequest = async (config) => {
    if (!Cookies.get('XSRF-TOKEN')) {
        await axios.get('/sanctum/csrf-cookie');
    }

    return config; 
}

axiosInstance.interceptors.request.use(onRequest, null);

export default axiosInstance;