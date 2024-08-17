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
            <h2>HELLLOOO</h2>
            <p>Your current user is: {user?.first_name}</p>
            <Button onClick={Logout}>Logout</Button>
        </div>
    );
}

export default Main;
