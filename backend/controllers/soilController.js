const Soil = require('../models/Soil');
const logger = require('../utils/logger');

const getSoils = async (req, res) => {
  try {
    const soils = await Soil.find();
    logger.info('Fetched all soil details');
    res.json(soils);
  } catch (error) {
    logger.error(`Error fetching soils: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

const createSoil = async (req, res) => {
  let { name, description, crops, phLevel } = req.body;
  
  if (typeof crops === 'string') {
    crops = crops.split(',').map(c => c.trim());
  }

  try {
    const soil = await Soil.create({ name, description, crops, phLevel });
    logger.info(`New soil created: ${name} by user ${req.user.id}`);
    res.status(201).json(soil);
  } catch (error) {
    logger.error(`Error creating soil: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getSoils, createSoil };
