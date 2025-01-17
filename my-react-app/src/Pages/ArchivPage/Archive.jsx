import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Container, Box, Paper, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ArchivePage = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('https://localhost:4000/archive');
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

  const currentComments = comments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 3 }}>
          Архив комментариев
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: 800, marginBottom: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  ID
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Пользователь
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                  Комментарий
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentComments.length > 0 ? (
                currentComments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell align="center">{comment.id}</TableCell>
                    <TableCell align="center">{comment.user}</TableCell>
                    <TableCell align="center">{comment.comment}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={3}>
                    Нет доступных комментариев
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={comments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </TableContainer>
        <Button variant="contained" color="primary" onClick={comeBack}>
          Назад
        </Button>
      </Box>
    </Container>
  );
};

export default ArchivePage;
