import axiosInstance from './AxiosInstance';

export const login = async (email: string, password: string): Promise<User> => {
    const response = await axiosInstance.post('/login', { email, password });
    return response.data;
};

export const logout = async (): Promise<boolean> => {
    await axiosInstance.post('/logout');
    window.location.href = '/';
    
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
