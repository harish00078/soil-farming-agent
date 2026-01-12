const mongoose = require("mongoose");

const soilSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  crops: [{ type: String }],
  phLevel: { type: String, required: true },
  distributors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Distributor' }]
}, { timestamps: true });

module.exports = mongoose.model("Soil", soilSchema);
