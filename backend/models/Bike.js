const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  code: { type: String },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  color: { type: String },
  price: { type: Number },
  maintenanceHistory: [
    {
      date: { type: Date },
      description: { type: String },
    },
  ],
});

const Bike = mongoose.model("Bike", bikeSchema);

module.exports = Bike;
