const router = require("express").Router();
const { getDistributors, createDistributor, updateDistributor, deleteDistributor } = require("../controllers/distributorController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", authMiddleware, getDistributors);
router.post("/", [authMiddleware, adminMiddleware], createDistributor);
router.put("/:id", [authMiddleware, adminMiddleware], updateDistributor);
router.delete("/:id", [authMiddleware, adminMiddleware], deleteDistributor);

module.exports = router;
