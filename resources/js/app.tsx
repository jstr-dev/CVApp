import ReactDOM from 'react-dom/client';
import React, { useState } from 'react';
import Main from "./Main";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './pages/Login';
import axios from 'axios';
import '../css/app.css';

const rootElement = document.getElementById('app') as HTMLElement;
if (!rootElement) {
  throw new Error('Could not find root element');
}

const App = () => {
	React.useEffect(() => {
		axios.get('/sanctum/csrf-cookie').catch((error) => {
			console.log(error);
		});
	}, []);

	const [theme, setTheme] = useState('light');
	const body = document.getElementsByTagName('body')[0];
	body.classList.add('theme-' + theme);

	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" Component={Main} />
					<Route path="/login" Component={Login} />
				</Routes>
			</div>
		</Router>
	);
}

ReactDOM.createRoot(rootElement).render(<App/>)