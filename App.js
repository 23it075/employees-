import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import EmployeeList from './components/EmployeeList';
import Navbar from './components/Navbar';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
        <Route path="/" element={isLoggedIn ? <EmployeeList /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
