import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const comeBack = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <h1>Вы вошли в приложение</h1>
      <p>Это главная страница</p>
      <button onClick={comeBack}>Выход</button>
    </div>
  );
};

export default Home;
