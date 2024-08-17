import React from 'react';
import { Navigate } from 'react-router-dom';
import { logout } from '../services/UserService';

export default function Logout() {
    logout();
    return <Navigate to="/login" />
}
