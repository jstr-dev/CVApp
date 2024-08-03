import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

function Login() {
    const navigate = useNavigate();
    const postLogin = async () => {
        console.log('sanem\'s booty is nice to touch');

        await axios.get('/sanctum/csrf-cookie').catch((error) => {
            console.log(error);
        });

        await axios.post('/login', {
            email: email,
            password: password
        }).then((response) => {
            navigate('/');
        }).catch((response) => {
            console.log('Cant login');
        });
    }

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    return (
        <div className='mainForm'>
            <h3>Please login</h3>

            <div className='loginForm'>
                <input name="email" type="text" onChange={(e) => setEmail(e.target.value)}></input>
                <input name="password" type="text" onChange={(e) => setPassword(e.target.value)}></input>
               <Button onClick={postLogin}>Login</Button> 
            </div>
        </div>
    );
}

export default Login;