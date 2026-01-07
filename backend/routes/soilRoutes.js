const router = require("express").Router();
router.get("/",(req,res)=>res.json([]));
router.post("/",(req,res)=>res.json({msg:"soil added"}));
module.exports = router;
