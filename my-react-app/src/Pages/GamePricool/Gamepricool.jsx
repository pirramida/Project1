import React, { useState, useEffect } from 'react';
import { TableContainer, Table, Button, TableHead, Dialog, DialogTitle, TableRow, DialogActions, TableCell, TableBody, Paper, DialogContent, TablePagination } from '@mui/material';

const Game = () => {
  const Rows = 3;
  const Cols = 3;

  const [matrix, setMatrix] = useState(() => {
    const newMatrix = Array(Rows)
      .fill(null)
      .map(() => Array(Cols).fill({ value: 0, color: 'grey' }));
    const randomRow = Math.floor(Math.random() * Rows);
    const randomCol = Math.floor(Math.random() * Cols);
    newMatrix[randomRow][randomCol] = { value: 1, color: 'grey' };
    return newMatrix;
  });

  const [counter, setCounter] = useState(0);
  const [gameData, setGameData] = useState([]);
  const [isGame, setIsGame] = useState(false);
  const [open, setOpen] = useState(false);
  const [statUser, setStatUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [page, setPage] = useState(0);
  const rowsPerPage = 8;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = async (user) => {
    setStatUser(user);
    setOpen(true);
    if (user) { 
        try {
          const response = await fetch(`https://localhost:4000/game/${user}`);
          if (!response.ok) {
            throw new Error('Ошибка при загрузке статистики');
          }
          const data = await response.json();
          setStats(data);
        } catch (error) {
          console.error('Ошибка при загрузке статистики:', error);
        }
      }
  };



  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch('https://localhost:4000/game');
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных игры');
        }
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных игры:', error);
      }
    };

    fetchGameData();
  }, []);

  const handleButtonClick = async (row, col, value) => {
    const newCounter = counter + 1;
    console.log(newCounter);
    setCounter(newCounter);

    const newMatrix = matrix.map((rowData, rowIndex) =>
      rowData.map((cell, colIndex) =>
        rowIndex === row && colIndex === col
          ? { ...cell, color: value === 1 ? 'green' : 'red' }
          : cell
      )
    );
    setMatrix(newMatrix);

    if (value === 1) {
      setIsGame(true);
      const user = JSON.parse(localStorage.getItem('user')) || 'Guest';
      const gameResult = { user, count: newCounter };

      try {
        const response = await fetch('https://localhost:4000/game', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(gameResult),
        });

        if (!response.ok) {
          throw new Error('Ошибка при отправке данных об игре');
        }

        const savedResult = await response.json();
        console.log('Игра завершена и сохранена:', savedResult);

        setGameData((prevData) => [...prevData, savedResult]);
      } catch (error) {
        console.error('Ошибка при отправке данных об игре:', error);
      }
    }
  };

  const newGame = () => {
    if (isGame) {
      setIsGame(false);
      const newMatrix = Array(Rows)
        .fill(null)
        .map(() => Array(Cols).fill({ value: 0, color: 'grey' }));
      const randomRow = Math.floor(Math.random() * Rows);
      const randomCol = Math.floor(Math.random() * Cols);
      newMatrix[randomRow][randomCol] = { value: 1, color: 'grey' };
      setMatrix(newMatrix);
      setCounter(0);
    }
  };

  const statisticPage = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Статистика игрока {statUser}</DialogTitle>

        <DialogContent>
          {stats ? (
            <>
              <p>Количество сыгранных игр: {stats.gamesPlayed}</p>
              <p>Общее количество нажатий: {stats.totalClicks}</p>
              <p>Среднее количество нажатий на игру: {stats.averageClicks.toFixed(2)}</p>
            </>
          ) : (
            <p>Загрузка статистики...</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const renderButton = () => (
    <div>
      {matrix.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((col, colIndex) => (
            <div key={colIndex} style={{ display: 'flex' }}>
              <button
                disabled={ col.color !== 'grey' }
                onClick={() => handleButtonClick(rowIndex, colIndex, col.value)}
                style={{
                  backgroundColor: `${col.color}`,
                  margin: '5px',
                  padding: '15px',
                }}
              ></button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const renderGameTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Игрок</TableCell>
            <TableCell>Количество ходов</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gameData
          .slice()
          .reverse()
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((game, gameIndex) => (
            <TableRow key={game.id}>
              <TableCell>{gameIndex+1}</TableCell>
              <TableCell>
                <Button onClick={() => handleClickOpen(game.user)}>{game.user}</Button>
              </TableCell>
              <TableCell>{game.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination 
      rowsPerPageOptions={[5]}
      component='div'
      count={gameData.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      />
    </TableContainer>
  );

  return (
    <>
      {renderButton()}
      <div>Количество нажатий: {counter}</div>
      <Button disabled={!isGame} onClick={newGame}>Новая игра!</Button>
      <h2>Результаты игр:</h2>
      {renderGameTable()}
      {statisticPage()}
    </>
  );
};

export default Game;
