import axiosInstance from './AxiosInstance';
import Cookies from 'js-cookie';

export const login = async (email: string, password: string, rememberMe: boolean): Promise<User> => {
    await axiosInstance.get('/sanctum/csrf-cookie');
    const response = await axiosInstance.post('/login', { email, password, rememberMe });
    return response.data.data;
};

export const signup = async (email: string, password: string, passwordConfirmation: string, firstName: string, lastName: string): Promise<User> => {
    await axiosInstance.get('/sanctum/csrf-cookie');
    const response = await axiosInstance.post('/signup', { email, password, password_confirmation: passwordConfirmation, first_name: firstName, last_name: lastName });
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

export const forgotPassword = async (email: string): Promise<boolean> => {
    await axiosInstance.get('/sanctum/csrf-cookie');
    return axiosInstance.post('/request-reset-link', { email })
        .then(() => true)
        .catch(() => false);
}
