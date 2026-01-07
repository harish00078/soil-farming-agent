const router = require("express").Router();
router.post("/register",(req,res)=>res.json({msg:"register"}));
router.post("/login",(req,res)=>res.json({msg:"login"}));
module.exports = router;
