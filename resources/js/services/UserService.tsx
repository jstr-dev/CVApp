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
    try {
        const response = await axiosInstance.get('/user');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch current user:', error);
        return null;
    }
};
