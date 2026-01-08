import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../index.css';

const DistributorList = () => {
  const [distributors, setDistributors] = useState([]);
  const [userRole, setUserRole] = useState('');

  // Form state
  const [newDistributor, setNewDistributor] = useState({
    name: '',
    contact: '',
    location: '',
    products: ''
  });

  const fetchDistributors = async () => {
    try {
      const { data } = await api.get('/distributors');
      setDistributors(data);
    } catch (error) {
      console.error('Error fetching distributors:', error);
    }
  };

  useEffect(() => {
    fetchDistributors();
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  const handleInputChange = (e) => {
    setNewDistributor({ ...newDistributor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/distributors', newDistributor);
      alert('Distributor added successfully!');
      setNewDistributor({ name: '', contact: '', location: '', products: '' });
      fetchDistributors();
    } catch (error) {
      console.error('Error adding distributor:', error);
      alert('Failed to add distributor');
    }
  };

  return (
    <div className="distributor-list">
      <h2>Distributors</h2>

      {/* Admin Only Form */}
      {userRole === 'admin' && (
         <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '1rem' }}>
          <h3>Add New Distributor (Admin)</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Distributor Name" 
              value={newDistributor.name} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="text" 
              name="contact" 
              placeholder="Contact Info" 
              value={newDistributor.contact} 
              onChange={handleInputChange} 
              required 
            />
             <input 
              type="text" 
              name="location" 
              placeholder="Location" 
              value={newDistributor.location} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="text" 
              name="products" 
              placeholder="Products (comma separated)" 
              value={newDistributor.products} 
              onChange={handleInputChange} 
              required 
            />
            <button type="submit">Post Distributor Details</button>
          </form>
        </div>
      )}

      <div className="list-container">
        {distributors.map((dist) => (
          <div key={dist._id} style={{ 
            background: 'rgba(0,0,0,0.3)', 
            margin: '10px 0', 
            padding: '15px', 
            borderRadius: '8px',
            textAlign: 'left' 
          }}>
            <h3 style={{ color: '#4CAF50', marginTop: 0 }}>{dist.name}</h3>
            <p><strong>Location:</strong> {dist.location}</p>
            <p><strong>Contact:</strong> {dist.contact}</p>
            <p><strong>Products:</strong> {Array.isArray(dist.products) ? dist.products.join(', ') : dist.products}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistributorList;
