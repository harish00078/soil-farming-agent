import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../index.css';

const SoilList = () => {
  const [soils, setSoils] = useState([]);
  const [userRole, setUserRole] = useState('');
  
  // Form state
  const [newSoil, setNewSoil] = useState({
    name: '',
    description: '',
    crops: '',
    phLevel: ''
  });

  const checkUserRole = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const role = localStorage.getItem('role');
      setUserRole(role);
    }
  };

  const fetchSoils = async () => {
    try {
      const { data } = await api.get('/soils');
      setSoils(data);
    } catch (error) {
      console.error('Error fetching soils:', error);
    }
  };

  useEffect(() => {
    fetchSoils();
    checkUserRole();
  }, []);

  const handleInputChange = (e) => {
    setNewSoil({ ...newSoil, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/soils', newSoil);
      alert('Soil added successfully!');
      setNewSoil({ name: '', description: '', crops: '', phLevel: '' });
      fetchSoils();
    } catch (error) {
      console.error('Error adding soil:', error);
      alert('Failed to add soil');
    }
  };

  return (
    <div className="soil-list">
      <h2>Soil Types</h2>

      {/* Admin Only Form */}
      {userRole === 'admin' && (
        <div style={{ marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '1rem' }}>
          <h3>Add New Soil (Admin)</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Soil Name" 
              value={newSoil.name} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="text" 
              name="description" 
              placeholder="Description" 
              value={newSoil.description} 
              onChange={handleInputChange} 
              required 
            />
             <input 
              type="text" 
              name="phLevel" 
              placeholder="pH Level" 
              value={newSoil.phLevel} 
              onChange={handleInputChange} 
              required 
            />
            <input 
              type="text" 
              name="crops" 
              placeholder="Suitable Crops (comma separated)" 
              value={newSoil.crops} 
              onChange={handleInputChange} 
              required 
            />
            <button type="submit">Post Soil Details</button>
          </form>
        </div>
      )}

      {/* List */}
      <div className="list-container">
        {soils.map((soil) => (
          <div key={soil._id} style={{ 
            background: 'rgba(0,0,0,0.3)', 
            margin: '10px 0', 
            padding: '15px', 
            borderRadius: '8px',
            textAlign: 'left' 
          }}>
            <h3 style={{ color: '#4CAF50', marginTop: 0 }}>{soil.name}</h3>
            <p><strong>Description:</strong> {soil.description}</p>
            <p><strong>pH Level:</strong> {soil.phLevel}</p>
            <p><strong>Suitable Crops:</strong> {Array.isArray(soil.crops) ? soil.crops.join(', ') : soil.crops}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoilList;
