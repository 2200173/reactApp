import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { TokenProvider, TokenContext } from './TokenContext';
import Home from './Home';
import CountriesPage from './CountriesPage.tsx';
import Login from './login/login';
import PrivateRoute from './api/PrivateRoute'; // Import PrivateRoute
import { AppBar, Toolbar, Typography, Button, Container, Grid } from '@mui/material';

const AppContent = () => {
    const { auth, logout } = useContext(TokenContext);

    return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
                                    My App
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Button color="inherit" component={Link} to="/">Home</Button>
                                    </Grid>
                                    {auth.token && (
                                        <Grid item>
                                            <Button color="inherit" component={Link} to="/countries">Countries</Button>
                                        </Grid>
                                    )}
                                    {auth.token ? (
                                        <>
                                            <Grid item>
                                                <Typography variant="body1" sx={{ display: 'inline' }}>Hello, {auth.userName}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Button color="inherit" onClick={logout}>Logout</Button>
                                            </Grid>
                                        </>
                                    ) : (
                                        <Grid item>
                                            <Button color="inherit" component={Link} to="/login">Login</Button>
                                        </Grid>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/countries" element={<PrivateRoute element={CountriesPage} />} />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <TokenProvider>
            <Router>
                <AppContent />
            </Router>
        </TokenProvider>
    );
};

export default App;
