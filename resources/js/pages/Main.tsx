import React from 'react';
import { getUserContext } from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';

function Main() {
    const { user } = getUserContext();

    return (
        <MainLayout>
            <p>Your current user is: {user?.first_name}</p>
            <p>Your current number is +{user?.mobile_country_code} {user?.mobile_number}</p>
            <p>Your current address is: {user?.address?.first_line}</p>

        </MainLayout>
    );
}

export default Main;
