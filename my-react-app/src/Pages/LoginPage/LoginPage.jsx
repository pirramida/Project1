import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';


const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleRegister = async () => {
    if (!password || !userName) { return;}

    try {
      const response = await fetch('https://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, password }),
      });
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(userName));

      navigate('/home');
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async () => {
    if (!password || !userName) { return;}
    try {
      const response = await fetch('https://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, password }),
      });
      const data = await response.json();

      if (data.error) {
        return;
      } else {
        localStorage.setItem('user', JSON.stringify(userName));
        setIsLoggedIn(true);
        navigate('/home');
      }
    } catch (err) {
      console.error(err);
    } 
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {isLoginMode ? 'Авторизация' : 'Регистрация'}
        </Typography>
        <TextField
          label="Логин"
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Пароль"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={isLoginMode ? handleLogin : handleRegister}
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => setIsLoginMode(!isLoginMode)}
          fullWidth
        >
          {isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Уже зарегистрированы? Войти!'}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
