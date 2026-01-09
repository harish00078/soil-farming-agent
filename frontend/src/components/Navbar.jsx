import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    return null;
  }

  return (
    <motion.nav 
      className="navbar navbar-glass"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-links">
        <Link to="/soils">Soils</Link>
        <Link to="/distributors">Distributors</Link>
      </div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </motion.nav>
  );
};

export default Navbar;
