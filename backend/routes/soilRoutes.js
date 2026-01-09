const router = require("express").Router();
const { getSoils, createSoil, updateSoil, deleteSoil } = require("../controllers/soilController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", authMiddleware, getSoils);
router.post("/", [authMiddleware, adminMiddleware], createSoil);
router.put("/:id", [authMiddleware, adminMiddleware], updateSoil);
router.delete("/:id", [authMiddleware, adminMiddleware], deleteSoil);

module.exports = router;
