import axiosInstance from './AxiosInstance';
import Cookies from 'js-cookie';

export const login = async (
    email: string,
    password: string,
    rememberMe: boolean
): Promise<User> => {
    const response = await axiosInstance.post("/login", {
        email,
        password,
        rememberMe,
    });
    return response.data.data;
};

export const signup = async (
    email: string,
    password: string,
    passwordConfirmation: string,
    firstName: string,
    lastName: string
): Promise<User> => {
    const response = await axiosInstance.post("/signup", {
        email,
        password,
        password_confirmation: passwordConfirmation,
        first_name: firstName,
        last_name: lastName,
    });
    return response.data.data;
};

export const logout = async (): Promise<boolean> => {
    await axiosInstance.post("/logout");
    return true;
};

export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const response = await axiosInstance.get("/user");
        return response.data;
    } catch (error) {
        return null;
    }
};

export const forgotPassword = async (email: string): Promise<boolean> => {
    return axiosInstance
        .post("/request-reset-link", { email })
        .then(() => true)
        .catch(() => false);
};

export const updateUser = async (user: User): Promise<User> => {
    const response = await axiosInstance.post("/user", user);
    return response.data.data;
};