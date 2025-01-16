import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };

  const goToArchive = () => {
    navigate('/archive');
  };

  return (
    <AppBar position="fixed" color="primary">
      <Container>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Мое Приложение
          </Typography>
          <Box>
            <Button color="inherit" onClick={goToHome}>
              Главная
            </Button>
            <Button color="inherit" onClick={goToArchive}>
              Архив
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
