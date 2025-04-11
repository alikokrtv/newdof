import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setIsLoggedIn(true);
                    navigate('/');
                } else {
                    alert('Giriş Başarısız! Kullanıcı adı veya şifre yanlış.');
                }
            })
            .catch((error) => console.error('Error during login:', error));
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Giriş Yap
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    label="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Şifre"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Giriş Yap
                </Button>
            </form>
        </Container>
    );
};

export default Login;