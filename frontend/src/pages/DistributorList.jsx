import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api';
import '../index.css';

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
        alert('Distributor deleted successfully!');
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
    <div className="list-page">
      <h2>Distributors</h2>

      {userRole === 'admin' && (
        <div className="form-container">
          <h3>Add New Distributor</h3>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Distributor Name" value={newDistributor.name} onChange={handleInputChange} required />
            <input type="text" name="contact" placeholder="Contact Info" value={newDistributor.contact} onChange={handleInputChange} required />
            <input type="text" name="location" placeholder="Location" value={newDistributor.location} onChange={handleInputChange} required />
            <input type="text" name="products" placeholder="Products (comma separated)" value={newDistributor.products} onChange={handleInputChange} required />
            <button type="submit">Post Distributor Details</button>
          </form>
        </div>
      )}

      <div className="list-container">
        {distributors.map((dist) => (
          <div key={dist._id} className="list-item">
            <div className="item-content">
              <h3 className="item-title">{dist.name}</h3>
              <p><strong>Location:</strong> {dist.location}</p>
              <p><strong>Contact:</strong> {dist.contact}</p>
              <p><strong>Products:</strong> {Array.isArray(dist.products) ? dist.products.join(', ') : dist.products}</p>
            </div>
            {userRole === 'admin' && (
              <div className="item-actions">
                <button onClick={() => openEditModal(dist)}>Edit</button>
                <button onClick={() => handleDelete(dist._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isEditing && currentDistributor && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Edit Distributor</h3>
            <form onSubmit={handleUpdate}>
              <input type="text" name="name" placeholder="Distributor Name" value={currentDistributor.name} onChange={handleInputChange} required />
              <input type="text" name="contact" placeholder="Contact Info" value={currentDistributor.contact} onChange={handleInputChange} required />
              <input type="text" name="location" placeholder="Location" value={currentDistributor.location} onChange={handleInputChange} required />
              <input type="text" name="products" placeholder="Products (comma separated)" value={currentDistributor.products} onChange={handleInputChange} required />
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

export default DistributorList;
