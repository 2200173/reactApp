import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TokenProvider } from './TokenContext';
import Home from './Home';
import CountriesPage from './CountriesPage.tsx';
import Login from './login/login';
import MainNavigation from './MainNavigation'; // Make sure to import the MainNavigation

const App = () => {
    return (
        <TokenProvider>
            <Router>
                <MainNavigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/countries" element={<CountriesPage />} />
                </Routes>
            </Router>
        </TokenProvider>
    );
};

export default App;
