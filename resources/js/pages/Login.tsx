import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { login } from '../services/UserService';
import { getUserContext } from '../contexts/UserContext';
import LoginLayout from '../layouts/LoginLayout';
import Input from '../components/Input';
import Checkbox from '@/components/Checkbox';

interface LoginError {
    email?: string;
    password?: string;
}

function Login() {
    const navigate = useNavigate();
    const { setUser } = getUserContext();

    const postLogin = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        const email = event.target.email.value;
        const password = event.target.password.value;
        const rememberMe = event.target['remember-me'].checked;

        try {
            const user = await login(email, password, rememberMe);
            setUser(user);
            navigate('/');
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.data) {
                setErrors(error.response.data.data);
            } else {
                setErrors({ email: 'An error occurred. Please try again.', password: '' });
            }
        } finally {
            setLoading(false);
        }
    }

    let [errors, setErrors] = useState<LoginError>({
        email: '',
        password: '',
    });

    let [loading, setLoading] = useState<boolean>(false);

    return (
        <LoginLayout>
            <div className="max-w-[500px] w-3/4 flex flex-col">
                <span className='mb-8 text-2xl font-semibold'>Welcome back!</span>

                <form className='loginForm flex flex-col center' onSubmit={postLogin}>
                    <Input type='email'
                        id='email'
                        label='Email'
                        className='mb-3'
                        error={errors.email}
                        required={true}
                    />

                    <Input type='password'
                        label='Password'
                        id='password'
                        className='mb-4'
                        error={errors.password}
                        required={true} />

                    <div className="flex flex-row justify-between mb-8">
                        <div className="flex flex-row items-center">
                            <Checkbox type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me" className='ml-1.5 mt-0 text-sm'>Remember me</label>
                        </div>

                        <Link className='link-col text-sm' to='/forgot-password'>Forgot password</Link>
                    </div>

                    <Button type='submit' loading={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>

                    <span className='text-center text-sm mt-6 hint-col'>Don't have an account? <Link className='link-col' to='/signup'>Sign up</Link></span>
                </form>
            </div>
        </LoginLayout>
    );
}

export default Login;
