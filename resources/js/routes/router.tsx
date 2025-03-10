import React from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Signup from '../pages/Signup';
import Onboarding from '../pages/Onboarding';
import PublicRoute from './PublicRoute';
import Logout from '../pages/Logout';
import ForgotPassword from '../pages/ForgotPassword';
import Applications from '@/pages/Applications';
import Templates from '@/pages/Templates/Index';
import Settings from '@/pages/Settings';
import ResetPassword from "@/pages/ResetPassword";
import Error from "../pages/Error";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            {
                index: true,
                element: <Main />,
            },

            {
                path: "applications",
                element: <Applications />,
            },

            {
                path: "templates",
                element: <Templates />,
            },

            {
                path: "cover-templates",
                element: <h1>hello</h1>,
            },

            {
                path: 'settings',
                element: <Settings />
            }
        ],
    },

    {
        path: "/",
        element: <ProtectedRoute noLayout />,
        children: [
            {
                path: "onboarding",
                element: <Onboarding />,
            },

            {
                path: "logout",
                element: <Logout />,
            },
        ],
    },

    {
        path: "/",
        element: <PublicRoute />,
        errorElement: <Error />,
        children: [
            {
                path: "login",
                element: <Login />,
            },

            {
                path: "signup",
                element: <Signup />,
            },

            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },

            {
                path: "reset-password",
                element: <ResetPassword />,
            },

            {
                path: "*",
                element: <Error />,
            },
        ],
    },
]);

export default router;
