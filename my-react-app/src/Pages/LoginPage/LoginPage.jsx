import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRegister = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, password }),
      });

      if (!response.ok) {
        throw new Error('Ошибка регистрации');
      }

      const data = await response.json();
      alert(`Регистрация успешна! Ваш ID: ${data.id}`);
      setIsLoggedIn(true);
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Ошибка: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogin = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, password }),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert(`Добро пожаловать! Ваш ID: ${data.id}`);
        setIsLoggedIn(true);
        navigate('/home');
      }
    } catch (err) {
      console.error(err);
      alert('Ошибка: ' + err.message);
    } finally {
      setIsProcessing(false);
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
          disabled={isProcessing}
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
          disabled={isProcessing}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={isLoginMode ? handleLogin : handleRegister}
          fullWidth
          sx={{ marginBottom: 2 }}
          disabled={isProcessing}
        >
          {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
        </Button>
        <Button
          variant="text"
          color="secondary"
          onClick={() => setIsLoginMode(!isLoginMode)}
          fullWidth
          disabled={isProcessing}
        >
          {isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Уже зарегистрированы? Войти!'}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
