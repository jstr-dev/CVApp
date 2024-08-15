import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { signup } from '../services/UserService';
import { getUserContext } from '../contexts/UserContext';
import LoginLayout from '../layouts/LoginLayout';
import Panel from '../components/Panel';
import Input from '../components/Input';

interface SignupError {
    email?: string;
    password?: string;
}

function Signup() {
    const navigate = useNavigate();
    const { setUser } = getUserContext();
    
    const postLogin = async (event) => {
        event.preventDefault();

        setLoading(true);
        try {
            const user = await signup(email, password);
            setUser(user);
            navigate('/details');
        } catch (error) {
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
    let [errors, setErrors] = useState<SignupError>({
        email: '',
        password: '',
    });
    let [loading, setLoading] = useState(false);

    return (
        <LoginLayout>
            <Panel className='min-w-[500px]'>
                <span className='text-center mb-6 text-xl'>SignUp</span>

                <form className='loginForm flex flex-col center' onSubmit={postLogin}>
                    <Input type='email' 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder='Email'
                        error={errors.email ? true : false}
                        className={errors.email ? 'mb-0' : 'mb-2'}
                        errorMessage={errors.email}/>

                    <Input type='password'
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder='Password'
                        error={errors.password ? true : false}
                        className={errors.password ? 'mb-0' : 'mb-5'}
                        errorMessage={errors.password}/>

                    <Button type='submit' isLoading={loading}>{loading ? 'Signing in..' : 'Signup'}</Button>         
                    <span className='text-center text-sm mt-2'>Already have an account? <Link className='text-violet-600' to='/login'>Login</Link></span>
                </form>
            </Panel>
        </LoginLayout>
    );
}

export default Signup