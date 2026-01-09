const mongoose = require("mongoose");

const distributorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  products: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model("Distributor", distributorSchema);
