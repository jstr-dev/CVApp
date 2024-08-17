import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserContext } from '../contexts/UserContext';

const PublicRoute = () => {
    const { user } = getUserContext();

    if (user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default PublicRoute;
