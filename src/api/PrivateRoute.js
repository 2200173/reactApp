import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../TokenContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { auth } = useContext(TokenContext);

    return auth.token ? (
        <Component {...rest} />
    ) : (
        <Navigate to="/login" />
    );
};

export default PrivateRoute;
