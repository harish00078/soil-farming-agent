import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import SoilList from './pages/SoilList';
import DistributorList from './pages/DistributorList';
import Background3D from './components/Background3D';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';

function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? (
      <>
        <Navbar />
        {children}
      </>
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    <ErrorBoundary>
      <Router>
        <Background3D />
        
        <div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/soils"
              element={
                <PrivateRoute>
                  <SoilList />
                </PrivateRoute>
              }
            />
            <Route
              path="/distributors"
              element={
                <PrivateRoute>
                  <DistributorList />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;