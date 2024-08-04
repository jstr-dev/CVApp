import React from 'react';
import { useUser } from './contexts/UserContext';
import Button from './components/Button';
import { logout } from './services/UserService';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
    const user = useUser();
    const navigate = useNavigate();

    return (
        <div>
            <h2>HELLLOOO</h2>
            {user !== null ?
            <>
                <p>Your current user is: {user.first_name}</p>
                <Button onClick={() => logout()}>Logout</Button>
            </>
            :
                <>
                    <p>You are not logged in!</p>
                    <Link to="/login">Login</Link>
                </>
            }
        </div>
    );
}

export default Main;