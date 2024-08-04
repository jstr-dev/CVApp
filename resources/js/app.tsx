import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import Main from "./Main";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import '../css/app.css';
import './types/global.d.ts';
import { UserProvider } from './contexts/UserContext';

const rootElement = document.getElementById('app') as HTMLElement;

if (!rootElement) {
	throw new Error('Could not find root element');
}

const App = () => {
	const [theme, setTheme] = useState('light');
	const body = document.getElementsByTagName('body')[0];
	body.classList.add('theme-' + theme);

	return (
		<UserProvider>
			<Router>
				<div>
					<Routes>
						<Route path="/" Component={Main} />
						<Route path="/login" Component={Login} />
					</Routes>
				</div>
			</Router>
		</UserProvider>
	);
}

ReactDOM.createRoot(rootElement).render(<App/>)