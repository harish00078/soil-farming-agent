const router = require("express").Router();
const Soil = require("../models/Soil");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Get all soils
router.get("/", authMiddleware, async (req, res) => {
  try {
    const soils = await Soil.find();
    res.json(soils);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new soil
router.post("/", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const newSoil = new Soil(req.body);
    const savedSoil = await newSoil.save();
    res.json(savedSoil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update soil
router.put("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const updatedSoil = await Soil.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSoil);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete soil
router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    await Soil.findByIdAndDelete(req.params.id);
    res.json({ msg: "Soil deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

module.exports = router;