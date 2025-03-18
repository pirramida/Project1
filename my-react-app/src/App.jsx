import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Home from "./Pages/HomePage/Home";
import ArchivePage from "./Pages/ArchivPage/Archive";
import Header from "./Header";
import Game from "./Pages/GamePricool/Gamepricool";
import Svgtest from "./Pages/SVGtestPage/Svgpage";
import Library from "./Pages/LibraryPage/Library";
import BurgerMenu from "./Components/BurgerMenu/BurgerMenu";
import ToDoList from './Pages/ToDoList/ToDoList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <Header setIsLoggedIn={setIsLoggedIn} />
    <BurgerMenu />

    <Routes>
      <Route
        path="/login"
        element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/home"
        element={isLoggedIn ? <Home to="/home"/> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />}
      />
      <Route 
        path="/archive"
        element={isLoggedIn ? <ArchivePage to="/archive" /> : <Navigate to="/login" />}
      />
      <Route
        path="/game"
        element={isLoggedIn ? <Game to="/game" /> : <Navigate to="/login" />}
      />
      <Route
      path="/svgtest"
      element={isLoggedIn ? <Svgtest to='/svgtest' /> : <Navigate to='/login' /> }
      />
      <Route
      path="/library"
      element={isLoggedIn ? <Library to='/library' /> : <Navigate to='/login' />}
      />
      <Route 
      path="/todolist"
      element={isLoggedIn ? <ToDoList to='/todolist'/> : <Navigate to='/login'/>}
      />
    </Routes>
    </>
  );
}

export default App;
