import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import '../index.css';

const SoilList = () => {
  const [soils, setSoils] = useState([]);
  const [userRole, setUserRole] = useState('');
  
  // Form state for creating
  const [newSoil, setNewSoil] = useState({ name: '', description: '', crops: '', phLevel: '' });
  
  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [currentSoil, setCurrentSoil] = useState(null);

  const fetchSoils = useCallback(async () => {
    try {
      const { data } = await api.get('/soils');
      setSoils(data);
    } catch (error) {
      console.error('Error fetching soils:', error);
      alert('Could not fetch soils.');
    }
  }, []);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    fetchSoils();
  }, [fetchSoils]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setCurrentSoil({ ...currentSoil, [name]: value });
    } else {
      setNewSoil({ ...newSoil, [name]: value });
    }
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
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentSoil) return;
    try {
      await api.put(`/soils/${currentSoil._id}`, currentSoil);
      alert('Soil updated successfully!');
      setIsEditing(false);
      setCurrentSoil(null);
      fetchSoils();
    } catch (error) {
      console.error('Error updating soil:', error);
      alert('Failed to update soil.');
    }
  };

  const handleDelete = async (soilId) => {
    if (window.confirm('Are you sure you want to delete this soil?')) {
      try {
        await api.delete(`/soils/${soilId}`);
        alert('Soil deleted successfully!');
        fetchSoils();
      } catch (error) {
        console.error('Error deleting soil:', error);
        alert('Failed to delete soil.');
      }
    }
  };

  const openEditModal = (soil) => {
    const soilWithStringCrops = { ...soil, crops: Array.isArray(soil.crops) ? soil.crops.join(', ') : soil.crops };
    setCurrentSoil(soilWithStringCrops);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setCurrentSoil(null);
  };

  return (
    <div className="list-page">
      <h2>Soil Types</h2>

      {userRole === 'admin' && (
        <div className="form-container">
          <h3>Add New Soil</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Soil Name" value={newSoil.name} onChange={handleInputChange} required />
            <input type="text" name="description" placeholder="Description" value={newSoil.description} onChange={handleInputChange} required />
            <input type="text" name="phLevel" placeholder="pH Level" value={newSoil.phLevel} onChange={handleInputChange} required />
            <input type="text" name="crops" placeholder="Suitable Crops (comma separated)" value={newSoil.crops} onChange={handleInputChange} required />
            <button type="submit">Post Soil Details</button>
          </form>
        </div>
      )}

      <div className="list-container">
        {soils.map((soil) => (
          <div key={soil._id} className="list-item">
            <div className="item-content">
              <h3 className="item-title">{soil.name}</h3>
              <p><strong>Description:</strong> {soil.description}</p>
              <p><strong>pH Level:</strong> {soil.phLevel}</p>
              <p><strong>Suitable Crops:</strong> {Array.isArray(soil.crops) ? soil.crops.join(', ') : soil.crops}</p>
            </div>
            {userRole === 'admin' && (
              <div className="item-actions">
                <button onClick={() => openEditModal(soil)}>Edit</button>
                <button onClick={() => handleDelete(soil._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {isEditing && currentSoil && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Soil</h3>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" placeholder="Soil Name" value={currentSoil.name} onChange={handleInputChange} required />
                <input type="text" name="description" placeholder="Description" value={currentSoil.description} onChange={handleInputChange} required />
                <input type="text" name="phLevel" placeholder="pH Level" value={currentSoil.phLevel} onChange={handleInputChange} required />
                <input type="text" name="crops" placeholder="Suitable Crops (comma separated)" value={currentSoil.crops} onChange={handleInputChange} required />
              <div className="modal-actions">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeEditModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilList;
