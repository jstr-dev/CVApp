// src/contexts/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser } from '../services/UserService';
import axiosInstance from '../services/AxiosInstance';

interface UserContextType {
    user: User | null;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getCurrentUser();
            setUser(fetchedUser);
            setLoading(false);
        };

        fetchUser();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): User | null => {
    const context = React.useContext(UserContext);

    if (context === null) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context.user;
};