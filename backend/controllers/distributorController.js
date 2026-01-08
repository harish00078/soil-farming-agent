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
  const { name, location, contact, products } = req.body;
  try {
    const distributor = await Distributor.create({ name, location, contact, products });
    logger.info(`New distributor created: ${name} by user ${req.user.id}`);
    res.status(201).json(distributor);
  } catch (error) {
    logger.error(`Error creating distributor: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getDistributors, createDistributor };
