const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  color: { type: String },
  purchaseDate: { type: Date },
  code: { type: String },
  maintenanceHistory: [
    {
      date: { type: Date },
      description: { type: String },
    },
  ],
});

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
