import React, { createContext, useState, useEffect } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [auth, setAuth] = useState({ token: null, userName: null });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserName = localStorage.getItem('userName');
        if (storedToken && storedUserName) {
            setAuth({ token: storedToken, userName: storedUserName });
        }
    }, []);

    const setToken = (token, userName) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        setAuth({ token, userName });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        setAuth({ token: null, userName: null });
    };

    return (
        <TokenContext.Provider value={{ auth, setToken, logout }}>
            {children}
        </TokenContext.Provider>
    );
};
