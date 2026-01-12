import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../index.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

    return (
      <nav className="navbar navbar-glass">
        <div className="nav-links">
          <Link to="/soils">Soils</Link>
          <Link to="/distributors">Distributors</Link>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
    );
  };
export default Navbar;
