import React, { useEffect, useState } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Container, Box, Paper,} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ArchivePage = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:4000/archive');
        if (!response.ok) {
          throw new Error('Не удалось загрузить комментарии');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
      }
    };
    fetchComments();
  }, []);

  const comeBack = () => {
    navigate('/home');
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Архив комментариев
        </Typography>
        <TableContainer component={Paper} sx={{  maxWidth: 800, marginBottom: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  ID
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold'}}>
                  Пользователь
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Комментарий
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell align="center">{comment.id}</TableCell>
                    <TableCell align='center'>{comment.user}</TableCell> 
                    <TableCell align="center">{comment.comment}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={2}>
                    Нет доступных комментариев
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="primary" onClick={comeBack}>
          Назад
        </Button>
      </Box>
    </Container>
  );
};

export default ArchivePage;
