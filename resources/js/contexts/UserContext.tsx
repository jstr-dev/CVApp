// src/contexts/UserContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser } from '../services/UserService';
import Loader from '../components/Loader';

interface UserContextType {
    user: User | null;
    setUser : (user: User | null) => void;
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
        return (
            <div className="h-full w-full flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const getUserContext = (): UserContextType => {
    const context = React.useContext(UserContext);

    if (context === null) {
        throw new Error('useUser must be used within a UserProvider');
    }

    return context;
};
