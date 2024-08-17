import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Signup from '../pages/Signup';
import Onboarding from '../pages/Onboarding';
import PublicRoute from './PublicRoute';
import Logout from '../pages/Logout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                index: true,
                element: <Main />
            },

            {
                path: 'onboarding',
                element: <Onboarding />
            },

            {
                path: "/logout",
                element: <Logout />
            },
        ],
    },

    {
        path: '/',
        element: <PublicRoute />,
        children: [
            {
                path: 'login',
                element: <Login />
            },

            {
                path: 'signup',
                element: <Signup />
            },
        ],
    },
])

export default router;
