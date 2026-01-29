import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import '../index.css';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      alert('Registration successful! You can now login.');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      const msg = error.response?.data?.msg || error.response?.data?.message || 'Registration failed';
      alert(`Registration Error: ${msg}`);
    }
  };

  return (
    <div className="form-page">
      <motion.div 
          className="glass-panel auth-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Account</h2>
        <form onSubmit={handleSubmit} style={{ background: 'none', padding: 0, border: 'none', width: '100%' }}>
          <input 
            type="text" 
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            minLength={6}
          />
          <small style={{ display: 'block', marginBottom: '1rem', color: '#ccc' }}>
            Password must be at least 6 characters long.
          </small>
          <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Register</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          Already have an account? <Link to="/login" className="auth-link">Login here</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;