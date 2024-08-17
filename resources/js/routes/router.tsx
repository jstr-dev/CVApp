import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Signup from '../pages/Signup';
import Onboarding from '../pages/Onboarding';
import Logout from '../pages/Logout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute></ProtectedRoute>,
        children: [
            {
                index: true,
                element: <Main />
            }
        ],
    },

    {
        path: '/login',
        element: <Login />
    },

    {
        path: '/signup',
        element: <Signup />
    },

    {
        path: '/logout',
        element: <Logout />
    },

    {
        path: '/onboarding',
        element: <Onboarding />
    }
])

export default router;
