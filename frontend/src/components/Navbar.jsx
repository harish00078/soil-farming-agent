import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (!token) {
    return null; // Don't render navbar on login/register pages
  }

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/soils">Soils</Link>
        <Link to="/distributors">Distributors</Link>
      </div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </nav>
  );
};

export default Navbar;
