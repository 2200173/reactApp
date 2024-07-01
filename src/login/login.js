// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Implement your login logic here
        // For demonstration, let's assume successful login redirects to /
        navigate('/');
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <h1>Login</h1>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
                <p></p>
                <Link to="/">
                <button className="btn btn-primary ml-2">Voltar</button> {/* Added ml-2 class for margin-left */}
                </Link>
            </div>

        </div>
    );
};

export default Login;
