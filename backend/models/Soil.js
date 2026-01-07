const mongoose = require("mongoose");
module.exports = mongoose.model("Soil", new mongoose.Schema({
  name:String,characteristics:String,suitableCrops:[String],moistureLevel:String
}));
