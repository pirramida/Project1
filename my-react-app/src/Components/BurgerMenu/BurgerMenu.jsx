import React, { useState } from 'react';
import './BurgerMenu.css';
import { useNavigate } from 'react-router-dom';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="burger-menu">
      <button
        className={`burger-icon ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => handleNavigation('/home')}>Главная</li>
          <li><a onClick={() => handleNavigation('/archive')}>Архив</a></li>
          <li><a onClick={() => handleNavigation('/game')}>Гамес</a></li>
          <li><a onClick={() => handleNavigation('/svgtest')}>SVG</a></li>
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
