import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '10px' }}>
        <li><Link to="/">Employees</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
