const Distributor = require('../models/Distributor');
const logger = require('../utils/logger');

const getDistributors = async (req, res) => {
  try {
    const distributors = await Distributor.find();
    logger.info('Fetched all distributor details');
    res.json(distributors);
  } catch (error) {
    logger.error(`Error fetching distributors: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createDistributor = async (req, res) => {
  let { name, location, contact, products } = req.body;
  
  if (typeof products === 'string') {
    products = products.split(',').map(p => p.trim());
  }

  try {
    const distributor = await Distributor.create({ name, location, contact, products });
    logger.info(`New distributor created: ${name} by user ${req.user.id}`);
    res.status(201).json(distributor);
  } catch (error) {
    logger.error(`Error creating distributor: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateDistributor = async (req, res) => {
  let { name, location, contact, products } = req.body;
  
  if (products && typeof products === 'string') {
    products = products.split(',').map(p => p.trim());
  }

  try {
    const distributor = await Distributor.findByIdAndUpdate(
      req.params.id,
      { name, location, contact, products },
      { new: true }
    );
    if (!distributor) return res.status(404).json({ message: 'Distributor not found' });
    
    logger.info(`Distributor updated: ${distributor.name} by user ${req.user.id}`);
    res.json(distributor);
  } catch (error) {
    logger.error(`Error updating distributor: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteDistributor = async (req, res) => {
  try {
    const distributor = await Distributor.findByIdAndDelete(req.params.id);
    if (!distributor) return res.status(404).json({ message: 'Distributor not found' });
    
    logger.info(`Distributor deleted: ${distributor.name} by user ${req.user.id}`);
    res.json({ msg: 'Distributor deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting distributor: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getDistributors, createDistributor, updateDistributor, deleteDistributor };