import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import LoginLayout from '../layouts/LoginLayout';
import Input from '../components/Input';
import { forgotPassword } from '@/services/UserService';

interface ForgotPasswordError{
    email?: string;
}

function Login() {
    const navigate = useNavigate();

    const postResetPassword = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        const email = event.target.email.value;
        const success = await forgotPassword(email);

        if (!success) {
            setErrors({ email: 'An error occurred. Please try again.' });
        }

        setLoading(false);
    }

    let [errors, setErrors] = useState<ForgotPasswordError>({
        email: '',
    });

    let [loading, setLoading] = useState<boolean>(false);

    return (
        <LoginLayout>
            <div className="max-w-[500px] w-3/4 flex flex-col">
                <span className='mb-2 text-2xl font-semibold'>Reset Password</span>
                <span className='mb-8 text-sm'>Enter your email address and we'll send you a link to reset your password.</span>

                <form className='loginForm flex flex-col center' onSubmit={postResetPassword}>
                    <Input type='email'
                        id='email'
                        label='Email'
                        className='mb-6'
                        error={errors.email}
                        required={true}
                    />

                    <Button type='submit' loading={loading}>
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>

                    <span className='text-center text-sm mt-6 hint-col'>Want to create an account? <Link className='link-col' to='/signup'>Sign up</Link></span>
                </form>
            </div>
        </LoginLayout>
    );
}

export default Login;
