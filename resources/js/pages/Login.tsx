import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            if (error.response && error.response.data && error.response.data.data) {
                setErrors(error.response.data.data);
            } else {
                setErrors({ email: 'An error occurred. Please try again.', password: '' });
            }
        } finally {
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
                    <Input type='email' 
                        onChange={(e) => setEmail(e.target.value)} 
                        label='Email'
                        error={errors.email ? true : false}
                        className={errors.email ? 'mb-0' : 'mb-2'}
                        errorMessage={errors.email}
                        id='email'/>

                    <Input type='password'
                        onChange={(e) => setPassword(e.target.value)} 
                        label='Password'
                        error={errors.password ? true : false}
                        className={errors.password ? 'mb-0' : 'mb-2'}
                        errorMessage={errors.password}
                        id='password'/>

                    <Button type='submit' isLoading={loading}>{loading ? 'Logging in..' : 'Login'}</Button>         
                    <span className='text-center text-sm mt-2'>Don't have an account? <Link className='text-violet-600' to='/signup'>Signup</Link></span>
                </form>
            </Panel>
        </LoginLayout>
    );
}

export default Login;
