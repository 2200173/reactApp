import React, { createContext, useState } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userName, setUserName] = useState(null);

    const updateToken = (token, userName) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userName', userName);
        setToken(token);
        setUserName(userName);
    };

    return (
        <TokenContext.Provider value={{ token, userName, setToken: updateToken }}>
            {children}
        </TokenContext.Provider>
    );
};
