import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { signup } from '../services/UserService';
import { getUserContext } from '../contexts/UserContext';
import LoginLayout from '../layouts/LoginLayout';
import Input from '../components/Input';

interface SignupError {
    email?: FormError;
    password?: FormError;
    first_name?: FormError;
    last_name?: FormError;
    middle_name?: FormError;
    password_confirmation?: FormError;
}

function Signup() {
    const navigate = useNavigate();
    const { setUser } = getUserContext();

    const postSignup = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        const email = event.target.email.value;
        const password = event.target.password.value;
        const passwordConfirmation = event.target.password_confirmation.value;
        const firstName = event.target.first_name.value;
        const lastName = event.target.last_name.value;
        // const middleName = event.target.middle_name.value;

        try {
            const user = await signup(email, password, passwordConfirmation, firstName, lastName);
            setUser(user);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data && error.response.data.data) {
                setErrors(error.response.data.data);
            } else {
                setErrors({ password_confirmation: 'An error occurred. Please try again.', password: '' });
            }
        } finally {
            setLoading(false);
        }
    }

    let [errors, setErrors] = useState<SignupError>();
    let [loading, setLoading] = useState(false);

    return (
        <LoginLayout>
            <div className="min-w-[400px] flex flex-col">
                <span className='mb-8 text-2xl font-semibold'>Kickstart your career with us</span>

                <form className='signupForm flex flex-col center' onSubmit={postSignup}>
                    <Input type='text'
                        id='first_name'
                        label='First Name'
                        className='mb-3'
                        error={errors?.first_name}
                        required={true}
                    />

                    {/* <Input type='text'
                        id='middle_name'
                        label='Middle Names'
                        className='mb-3'
                        error={errors?.middle_name}
                        required={true}
                    /> */}

                    <Input type='text'
                        id='last_name'
                        label='Last Name'
                        className='mb-3'
                        error={errors?.last_name}
                        required={true}
                    />

                    <Input type='email'
                        id='email'
                        label='Email'
                        className='mb-3'
                        error={errors?.email}
                        required={true}
                    />

                    <Input type='password'
                        label='Password'
                        id='password'
                        className='mb-3'
                        error={errors?.password}
                        required={true} />

                    <Input type='password'
                        label='Confirm password'
                        id='password_confirmation'
                        className='mb-8'
                        error={errors?.password_confirmation}
                        required={true} />

                    <Button type='submit' loading={loading}>
                        {loading ? 'Loading...' : 'Sign up'}
                    </Button>

                    <span className='text-center text-sm mt-6 hint-col'>Already have an account? <Link className='text-violet-600' to='/login'>Login</Link></span>
                </form>
            </div>
        </LoginLayout>
    );
}

export default Signup
