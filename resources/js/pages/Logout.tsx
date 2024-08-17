import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { logout } from '../services/UserService';
import { getUserContext } from '../contexts/UserContext';

export default function Logout() {
    const { setUser } = getUserContext();

    useEffect(() => {
        const logoutUser = async () => {
            await logout();
            setUser(null);
        }

        logoutUser();
    }, [setUser]);

    return <Navigate to="/login" />
}
