import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import Main from "./Main";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import '../css/app.css';
import './types/global.d.ts';
import { UserProvider } from './contexts/UserContext';
import axiosInstance from './services/AxiosInstance.tsx';

const rootElement = document.getElementById('app') as HTMLElement;

if (!rootElement) {
	throw new Error('Could not find root element');
}

const App = () => {
    // Request new XSRF Cookie every 5 minutes
    React.useEffect(() => {
        let interval = setInterval(() => {
            axiosInstance.get('/sanctum/csrf-cookie');
        }, 300000);

        return () => clearInterval(interval);
    }, []);

	return (
		<UserProvider>
			<Router>
				<div>
					<Routes>
						<Route path="/" Component={Main} />
						<Route path="/login" Component={Login} />
						<Route path="/signup" Component={Signup} />
					</Routes>
				</div>
			</Router>
		</UserProvider>
	);
}

ReactDOM.createRoot(rootElement).render(<App/>)
