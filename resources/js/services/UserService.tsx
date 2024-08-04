import axiosInstance from './AxiosInstance';
import Cookies from 'js-cookie';

export const login = async (email: string, password: string): Promise<User> => {
    await axiosInstance.get('/sanctum/csrf-cookie');
    const response = await axiosInstance.post('/login', { email, password });
    return response.data.data;
};

export const logout = async (): Promise<boolean> => {
    await axiosInstance.post('/logout');
    Cookies.remove('XSRF-TOKEN');
    return true;
}

export const getCurrentUser = async (): Promise<User | null> => {
    const response = await axiosInstance.get('/user').then((response) => response.data.data).catch((error) => null);
    return response;
};
