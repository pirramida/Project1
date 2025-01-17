import React from 'react';
import { AppBar, Container, Toolbar, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  const goToArchive = () => {
    navigate('/archive');
  };

  const goToLogin = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const goToGame = () => {
    navigate('/game');
  };

  const goToSVG = () => {
    navigate('/svgtest');
  };

  const goToLibrary = () => {
    navigate('/library');
  };

  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ top: 0, left: 0, right: 0 }}>
        <Container>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              TestDrive
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 5 }}>
              <Button color="inherit" onClick={goToHome}>
                Главная
              </Button>
              <Button color="inherit" onClick={goToArchive}>
                Архив
              </Button>
              <Button color="inherit" onClick={goToGame}>
                Гамес
              </Button>
              <Button color="inherit" onClick={goToSVG}>
                SVG
              </Button>
              <Button color="inherit" onClick={goToLibrary}>
                Библиотека
              </Button>
              <Button color="inherit" onClick={goToLogin}>
                Выход
              </Button>
              
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box sx={{ marginTop: '64px' }}></Box>
    </>
  );
};

export default Header;
