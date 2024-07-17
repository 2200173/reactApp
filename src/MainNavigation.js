import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { TokenContext } from './TokenContext';

const MainNavigation = () => {
    const { token, userName } = useContext(TokenContext);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    component={Link} 
                    to="/" 
                    sx={{ 
                        flexGrow: 1, 
                        textDecoration: 'none', 
                        color: 'inherit', 
                        '&:hover': {
                            textDecoration: 'none',
                            color: 'inherit'
                        },
                        '&:focus': {
                            outline: 'none',
                            color: 'inherit'
                        }
                    }}
                >
                    My App
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/countries">
                    Countries
                </Button>
                {token ? (
                    <Typography color="inherit" sx={{ marginLeft: 2 }}>
                        Hello, {userName}
                    </Typography>
                ) : (
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default MainNavigation;
