import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from './config/AxiosConfig';

function Main() {
    return (
        <div>
            <h2>HELLLOOO</h2>
            <Link to="/login">Login</Link>
            <button onClick={() => axios.get('test')}>Test</button>
        </div>
    );
}

export default Main;