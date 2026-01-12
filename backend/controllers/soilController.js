const Soil = require('../models/Soil');
const logger = require('../utils/logger');

const getSoils = async (req, res) => {
  try {
    const soils = await Soil.find().populate('distributors');
    logger.info('Fetched all soil details');
    res.json(soils);
  } catch (error) {
    logger.error(`Error fetching soils: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createSoil = async (req, res) => {
  let { name, description, crops, phLevel, distributors } = req.body;
  
  if (typeof crops === 'string') {
    crops = crops.split(',').map(c => c.trim());
  }

  try {
    const soil = await Soil.create({ name, description, crops, phLevel, distributors });
    logger.info(`New soil created: ${name} by user ${req.user.id}`);
    res.status(201).json(soil);
  } catch (error) {
    logger.error(`Error creating soil: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateSoil = async (req, res) => {
  let { name, description, crops, phLevel, distributors } = req.body;
  
  if (crops && typeof crops === 'string') {
    crops = crops.split(',').map(c => c.trim());
  }

  try {
    const soil = await Soil.findByIdAndUpdate(
      req.params.id,
      { name, description, crops, phLevel, distributors },
      { new: true }
    );
    if (!soil) return res.status(404).json({ message: 'Soil not found' });
    
    logger.info(`Soil updated: ${soil.name} by user ${req.user.id}`);
    res.json(soil);
  } catch (error) {
    logger.error(`Error updating soil: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteSoil = async (req, res) => {
  try {
    const soil = await Soil.findByIdAndDelete(req.params.id);
    if (!soil) return res.status(404).json({ message: 'Soil not found' });
    
    logger.info(`Soil deleted: ${soil.name} by user ${req.user.id}`);
    res.json({ msg: 'Soil deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting soil: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getSoils, createSoil, updateSoil, deleteSoil };