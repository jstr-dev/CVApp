import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { login } from '../services/UserService';
import { getUserContext } from '../contexts/UserContext';
import LoginLayout from '../layouts/LoginLayout';
import Panel from '../components/Panel';
import Input from '../components/Input';

interface LoginError {
    email?: string;
    password?: string;
}

function Login() {
    const navigate = useNavigate();
    const { setUser } = getUserContext();
    
    const postLogin = async (event) => {
        event.preventDefault();

        setLoading(true);
        try {
            const user = await login(email, password);
            setUser(user);
            navigate('/');
        } catch (error) {
            console.log('Error response:', error.response);
            if (error.response && error.response.data && error.response.data.data) {
                setErrors(error.response.data.data);
            } else {
                setErrors({ email: 'An error occurred. Please try again.', password: '' });
            }
        }  finally{
            setLoading(false);
        }
    }

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errors, setErrors] = useState<LoginError>({
        email: '',
        password: '',
    });
    let [loading, setLoading] = useState(false);

    return (
        <LoginLayout>
            <Panel className='min-w-[500px]'>
                <span className='text-center mb-6 text-xl'>Login</span>

                <form className='loginForm flex flex-col center' onSubmit={postLogin}>
                    <Input type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='mb-2'></Input>

                    <Input type='password'
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder='Password' 
                        className={'mb-5' + (errors.password ? 'mb-0 border-red-500' : '')}/>

                    {errors.password && <span className='text-red-500 mb-5 italic text-xs'>{errors.password}</span>}

                    <Button type='submit' isLoading={loading}>{loading ? 'Logging in..' : 'Login'}</Button> 
                </form>
            </Panel>
        </LoginLayout>
    );
}

export default Login;