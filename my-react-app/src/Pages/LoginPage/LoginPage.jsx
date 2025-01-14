import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setIsLoggedIn }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true); // Для переключения между "Вход" и "Регистрация"
  const navigate = useNavigate();

  // Обработчик для входа
  const handleAuthorization = () => {
    const storedUser = localStorage.getItem(userName);
    if (storedUser && storedUser === password) {
      setIsLoggedIn(true);
      navigate('/home'); // Переход на домашнюю страницу
    } else {
      alert('Неверные данные для входа');
    }
  };

  // Обработчик для регистрации
  const handleRegistration = () => {
    if (!userName || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    // Сохраняем данные пользователя в localStorage
    localStorage.setItem(userName, password);
    setIsLoggedIn(true);
    navigate('/home'); // Переход на домашнюю страницу
  };

  return (
    <div>
      <h1>{isLoginMode ? 'Авторизация' : 'Регистрация'}</h1>
      <div>
        <input
          type="text"
          placeholder="Логин"
          value={userName}
          onChange={(e) => setUserName(e.target.value)} // Обновление состояния при изменении текста
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Обновление состояния при изменении текста
        />
      </div>
      <div>
        {isLoginMode ? (
          <button onClick={handleAuthorization}>Вход</button>
        ) : (
          <button onClick={handleRegistration}>Зарегистрироваться</button>
        )}
      </div>
      <div>
        <button onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Уже зарегистрированы? Войти'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
