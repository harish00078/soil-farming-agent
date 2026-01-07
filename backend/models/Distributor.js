const mongoose = require("mongoose");
module.exports = mongoose.model("Distributor", new mongoose.Schema({
  name:String,location:String,contact:String,cropsAvailable:[String]
}));
