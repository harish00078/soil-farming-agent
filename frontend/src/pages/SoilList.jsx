import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../index.css';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

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
        // Optimistic update or refetch
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
    <motion.div 
      className="list-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="section-header">
        <h2>Soil Types</h2>
        {/* Placeholder for potential future filters/actions */}
      </div>

      {userRole === 'admin' && (
        <motion.div 
          className="glass-panel form-panel"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Add New Soil</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <input type="text" name="name" placeholder="Soil Name" value={newSoil.name} onChange={handleInputChange} required />
            <input type="text" name="phLevel" placeholder="pH Level" value={newSoil.phLevel} onChange={handleInputChange} required />
            <input className="full-width" type="text" name="crops" placeholder="Suitable Crops (comma separated)" value={newSoil.crops} onChange={handleInputChange} required />
            <textarea className="full-width" name="description" placeholder="Description" value={newSoil.description} onChange={handleInputChange} required rows="3" />
            <button type="submit" className="full-width">Post Soil Details</button>
          </form>
        </motion.div>
      )}

      <motion.div 
        className="list-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {soils.map((soil) => (
            <motion.div 
              key={soil._id} 
              className="glass-panel list-card"
              variants={itemVariants}
              layout
            >
              <h3 className="card-title">{soil.name}</h3>
              <p><strong>Description:</strong> {soil.description}</p>
              <p><strong>pH Level:</strong> {soil.phLevel}</p>
              <p><strong>Suitable Crops:</strong> {Array.isArray(soil.crops) ? soil.crops.join(', ') : soil.crops}</p>
              
              <div className="distributor-section">
                <h4>Recommended Distributors:</h4>
                {soil.distributors && soil.distributors.length > 0 ? (
                  <ul className="distributor-list">
                    {soil.distributors.map(d => (
                      <li key={d._id} className="distributor-item">
                        <Link to="/distributors" className="dist-name" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                          {d.name}
                        </Link>
                        <span className="dist-loc">{d.location}</span>
                        <a href={`mailto:${d.contact}`} className="dist-contact" style={{ color: 'inherit', textDecoration: 'none' }}>
                          {d.contact}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-data">No distributors linked.</p>
                )}
              </div>

              {userRole === 'admin' && (
                <div className="card-actions">
                  <button className="btn-edit" onClick={() => openEditModal(soil)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(soil._id)}>Delete</button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {isEditing && currentSoil && (
        <div className="modal-backdrop">
          <motion.div 
            className="glass-panel modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div style={{ padding: '24px' }}>
              <h3 style={{ marginTop: 0 }}>Edit Soil</h3>
              <form onSubmit={handleUpdate}>
                  <input type="text" name="name" placeholder="Soil Name" value={currentSoil.name} onChange={handleInputChange} required />
                  <input type="text" name="phLevel" placeholder="pH Level" value={currentSoil.phLevel} onChange={handleInputChange} required />
                  <input type="text" name="crops" placeholder="Suitable Crops (comma separated)" value={currentSoil.crops} onChange={handleInputChange} required />
                  <textarea name="description" placeholder="Description" value={currentSoil.description} onChange={handleInputChange} required rows="3" />
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={closeEditModal}>Cancel</button>
                  <button type="submit">Save Changes</button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default SoilList;
