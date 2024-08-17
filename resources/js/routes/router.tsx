import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Signup from '../pages/Signup';

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
])

export default router;
