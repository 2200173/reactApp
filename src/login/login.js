import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TokenContext } from '../TokenContext';
import { Button, TextField, Alert, CircularProgress } from '@mui/material';
import '../styles.css'; // Import your CSS file
import './login.css';

const Login = () => {
    const { setToken } = useContext(TokenContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/demo/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            setIsLoading(false);
            if (response.ok) {
                const data = await response.json();
                setToken(data.token, data.userName); // Save userName as well
                navigate('/');
            } else {
                const errorData = await response.json();
                alert('Login failed: ' + (errorData.message || 'Invalid credentials.'));
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error during login:', error);
            alert('An error occurred: ' + error.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-form">
                <h1>Login</h1>
                {isLoading && <CircularProgress className="loading" />}
                {error && <Alert severity="error">{error}</Alert>}
                <div className="form-group">
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    disabled={isLoading}
                >
                    Login
                </Button>
                <div className="button-container">
                    <Link to="/">
                        <Button variant="outlined" className="btn-secondary">Voltar</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
