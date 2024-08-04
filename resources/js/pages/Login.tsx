import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { login } from '../services/UserService';

function Login() {
    const navigate = useNavigate();
    const postLogin = async () => {
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            // setError('Failed to login. Please check your credentials and try again.');
        }
    }

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    return (
        <div>
            <h3>Please login</h3>

            <div className='loginForm flex flex-col center'>
                <input name="email" type="text" onChange={(e) => setEmail(e.target.value)}></input>
                <input name="password" type="text" onChange={(e) => setPassword(e.target.value)}></input>
               <Button onClick={postLogin}>Login</Button> 
            </div>
        </div>
    );
}

export default Login;