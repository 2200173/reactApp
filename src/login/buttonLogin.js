// ButtonToLogin.js

import React from 'react';
import { Link } from 'react-router-dom';

const ButtonToLogin = () => {
    return (
        <div> <div className="login-button-container">
            <Link to="/login">
                <button className="btn btn-primary">Login</button>
            </Link>
        </div>

        </div>

    );
};

export default ButtonToLogin;
