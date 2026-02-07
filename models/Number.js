const mongoose = require("mongoose");

const NumberSchema = new mongoose.Schema({
  country: String,
  number: String,
  price: Number,
  status: { type: String, default: "available" }
});

module.exports = mongoose.model("Number", NumberSchema);
