import ReactDOM from 'react-dom/client';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import '../css/app.css';
import { UserProvider } from './contexts/UserContext';
import axiosInstance from './services/AxiosInstance';
import router from './routes/router';
import NavbarProvider from './contexts/NavContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootElement = document.getElementById('app') as HTMLElement;

if (!rootElement) {
	throw new Error('Could not find root element');
}

const queryClient = new QueryClient();

const App = () => {
    // Request new XSRF Cookie every 5 minutes
    React.useEffect(() => {
        let interval = setInterval(() => {
            axiosInstance.get('/sanctum/csrf-cookie');
        }, 300000);

        return () => clearInterval(interval);
    }, []);

	return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <NavbarProvider>
                    <RouterProvider router={router} />
                </NavbarProvider>
            </UserProvider>
        </QueryClientProvider>
	);
}

ReactDOM.createRoot(rootElement).render(<App/>)
