import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserContext } from '../contexts/UserContext';

const ProtectedRoute = () => {
    const { user } = getUserContext();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!['/onboarding', '/logout'].includes(location.pathname) && user.onboarding_stage !== 'finished') {
        return <Navigate to="/onboarding" />
    }

    return <Outlet />;
};

export default ProtectedRoute;
