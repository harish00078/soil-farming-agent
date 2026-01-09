import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const DistributorList = () => {
  const [distributors, setDistributors] = useState([]);
  const [userRole, setUserRole] = useState('');

  // Form state for creating
  const [newDistributor, setNewDistributor] = useState({ name: '', contact: '', location: '', products: '' });

  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [currentDistributor, setCurrentDistributor] = useState(null);

  const fetchDistributors = useCallback(async () => {
    try {
      const { data } = await api.get('/distributors');
      setDistributors(data);
    } catch (error) {
      console.error('Error fetching distributors:', error);
      alert('Could not fetch distributors.');
    }
  }, []);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
    fetchDistributors();
  }, [fetchDistributors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setCurrentDistributor({ ...currentDistributor, [name]: value });
    } else {
      setNewDistributor({ ...newDistributor, [name]: value });
    }
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentDistributor) return;
    try {
      await api.put(`/distributors/${currentDistributor._id}`, currentDistributor);
      alert('Distributor updated successfully!');
      setIsEditing(false);
      setCurrentDistributor(null);
      fetchDistributors();
    } catch (error) {
      console.error('Error updating distributor:', error);
      alert('Failed to update distributor.');
    }
  };

  const handleDelete = async (distributorId) => {
    if (window.confirm('Are you sure you want to delete this distributor?')) {
      try {
        await api.delete(`/distributors/${distributorId}`);
        // Optimistic update or refetch
        fetchDistributors();
      } catch (error) {
        console.error('Error deleting distributor:', error);
        alert('Failed to delete distributor.');
      }
    }
  };

  const openEditModal = (distributor) => {
    const distributorWithStringProducts = { ...distributor, products: Array.isArray(distributor.products) ? distributor.products.join(', ') : distributor.products };
    setCurrentDistributor(distributorWithStringProducts);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setCurrentDistributor(null);
  };

  return (
    <motion.div 
      className="list-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="section-header">
        <h2>Distributors</h2>
      </div>

      {userRole === 'admin' && (
        <motion.div 
          className="glass-panel form-panel"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Add New Distributor</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <input type="text" name="name" placeholder="Distributor Name" value={newDistributor.name} onChange={handleInputChange} required />
            <input type="text" name="contact" placeholder="Contact Info" value={newDistributor.contact} onChange={handleInputChange} required />
            <input type="text" name="location" placeholder="Location" value={newDistributor.location} onChange={handleInputChange} required />
            <input type="text" name="products" placeholder="Products (comma separated)" value={newDistributor.products} onChange={handleInputChange} required />
            <button type="submit" className="full-width">Post Distributor Details</button>
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
          {distributors.map((dist) => (
            <motion.div 
              key={dist._id} 
              className="glass-panel list-card"
              variants={itemVariants}
              layout
            >
              <h3 className="card-title">{dist.name}</h3>
              <p><strong>Location:</strong> {dist.location}</p>
              <p><strong>Contact:</strong> {dist.contact}</p>
              <p><strong>Products:</strong> {Array.isArray(dist.products) ? dist.products.join(', ') : dist.products}</p>
              
              {userRole === 'admin' && (
                <div className="card-actions">
                  <button className="btn-edit" onClick={() => openEditModal(dist)}>Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(dist._id)}>Delete</button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {isEditing && currentDistributor && (
        <div className="modal-backdrop">
          <motion.div 
            className="glass-panel modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div style={{ padding: '24px' }}>
              <h3 style={{ marginTop: 0 }}>Edit Distributor</h3>
              <form onSubmit={handleUpdate}>
                <input type="text" name="name" placeholder="Distributor Name" value={currentDistributor.name} onChange={handleInputChange} required />
                <input type="text" name="contact" placeholder="Contact Info" value={currentDistributor.contact} onChange={handleInputChange} required />
                <input type="text" name="location" placeholder="Location" value={currentDistributor.location} onChange={handleInputChange} required />
                <input type="text" name="products" placeholder="Products (comma separated)" value={currentDistributor.products} onChange={handleInputChange} required />
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

export default DistributorList;
