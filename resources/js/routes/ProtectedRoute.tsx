import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserContext } from '../contexts/UserContext';

const ProtectedRoute = () => {
    const { user } = getUserContext();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (user.onboarding_stage !== 'finished') {
        return <Navigate to="/onboarding" />
    }

    return <Outlet />;
};

export default ProtectedRoute;
