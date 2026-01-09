import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import '../index.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.user.role);
            navigate('/soils');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid credentials');
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
                <form onSubmit={handleSubmit} style={{ background: 'none', padding: 0, border: 'none', width: '100%' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Welcome Back</h2>
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
                    />
                    <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Login</button>
                    <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        Don't have an account? <Link to="/register" className="auth-link">Register</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;