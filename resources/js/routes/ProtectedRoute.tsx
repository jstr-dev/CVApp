import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserContext } from '../contexts/UserContext';
import MainLayout from '@/layouts/MainLayout';

const ProtectedRoute = ({noLayout} : {noLayout?: boolean}) => {
    const { user } = getUserContext();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!['/onboarding', '/logout'].includes(location.pathname) && user.onboarding_stage !== 'finished') {
        return <Navigate to="/onboarding" />
    }

    if (noLayout) {
        return <Outlet />;
    }

    return <MainLayout><Outlet /></MainLayout>;
};

export default ProtectedRoute;
