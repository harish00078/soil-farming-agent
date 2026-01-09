const mongoose = require("mongoose");

const soilSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  crops: [{ type: String }],
  phLevel: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Soil", soilSchema);
