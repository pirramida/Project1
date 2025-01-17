import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  
  const sendComment = async (comment) => {  
    if (!comment) return;
    const user = JSON.parse(localStorage.getItem('user'));

    try {
      const response = await fetch('https://localhost:4000/archive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment, user}),
      });

      if (!response.ok) {
        throw new Error('Не удалось отправить комментарий');
      }

      const data = await response.json();
      console.log('Комментарий успешно отправлен:', data);
      setComment('');
    } catch (error) {
      console.error('Ошибка при отправке комментария:', error);
    }
  };

  const archivPage = () => {
    navigate('/archive');
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
        <Typography variant='h5' component='h1' >
          Вы вошли в приложение
        </Typography>
        <Typography variant='h5' component='h1' >
          Это главная страница
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
        <Typography variant="h6">Отправка комментариев</Typography>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type="text"
          placeholder="Введите комментарий!"
          fullWidth
        />
        <Button
          onClick={() => sendComment(comment)}>
          Отправить         
        </Button>
        <Button variant="text" onClick={archivPage}>
          Перейти в архив
        </Button>
        
      </Box>

    </Container>
  );
};

export default Home;
