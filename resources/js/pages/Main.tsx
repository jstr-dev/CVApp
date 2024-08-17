import React from 'react';
import { getUserContext } from '../contexts/UserContext';
import Button from '../components/Button';
import { logout } from '../services/UserService';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
    const { user, setUser } = getUserContext();

    const Logout = async () => {
        await logout();
        setUser(null);
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>Your current user is: {user?.first_name}</p>
            <p>Your current number is +{user?.mobile_country_code} {user?.mobile_number}</p>
            <p>Your current address is: {user?.address?.first_line}</p>
            <Button onClick={Logout} className='mt-6'>Logout</Button>
        </div>
    );
}

export default Main;
