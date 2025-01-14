// public/electron.js

const { app, BrowserWindow } = require('electron');
const path = require('path');

// Функция для создания окна
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Чтобы использовать Node.js в браузере
    },
  });

  win.loadURL('http://localhost:3000'); // Загружаем React-приложение, которое будет работать на порту 3000
}

// Когда приложение готово, создаем окно
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Выход из приложения при закрытии всех окон
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
