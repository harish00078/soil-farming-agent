const router = require("express").Router();
const Distributor = require("../models/Distributor");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Get all distributors
router.get("/", authMiddleware, async (req, res) => {
  try {
    const distributors = await Distributor.find();
    res.json(distributors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new distributor
router.post("/", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const newDistributor = new Distributor(req.body);
    const savedDistributor = await newDistributor.save();
    res.json(savedDistributor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update distributor
router.put("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    const updatedDistributor = await Distributor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDistributor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete distributor
router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
  try {
    await Distributor.findByIdAndDelete(req.params.id);
    res.json({ msg: "Distributor deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

module.exports = router;