import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/LoginPage";
import Home from "./Pages/HomePage/Home";
import ArchivePage from "./Pages/ArchivPage/Archive";
import Header from "./Header";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
    <Header />

    <Routes>
      <Route
        path="/login"
        element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
      />
      <Route
        path="/home"
        element={isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />}
      />
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />
      <Route 
        path="/archive"
        element={<ArchivePage/>}
      />
    </Routes>
    </>
  );
}

export default App;
