var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var crypto = require("crypto");

var Bike = require("../models/Bike");

const generateBikeCode = (id) => {
  // Generate a random hash from the MongoDB id
  const hash = crypto.createHash("sha256").update(id.toString()).digest("hex");

  // Truncate to 6 chars
  return hash.slice(0, 6);
};

/* GET bikes listing. */
router.get("/", async function (req, res, next) {
  try {
    console.log("Fetching bikes from DB...");
    const bikes = await Bike.find(); // Hakee kaikki pyörät tietokannasta
    res.json(bikes);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error fetching the bikes: ${error.message}` });
  }
});

/* GET bike with code. */
router.post("/code", async function (req, res, next) {
  const { code } = req.body;

  // Check that the code is valid type and length
  if (typeof code !== "string" || code.length !== 6) {
    res.status(500).json({ error: "Code not valid." });
  } else {
    try {
      const bike = await Bike.findOne({ code });
      res.json(bike);
    } catch (error) {
      res
        .status(500)
        .json({ error: `Error fetching the bikes: ${error.message}` });
    }
  }
});

// ADD bike
router.post("/add", async (req, res) => {
  const { brand, model, color, purchaseDate } = req.body;
  console.log("adding bike...");
  console.log(`brand: ${brand} model: ${model} purchaseDate: ${purchaseDate}`);
  try {
    const newBike = new Bike({ brand, model, color, purchaseDate });
    await newBike.save();
    const code = generateBikeCode(newBike._id);
    await Bike.findByIdAndUpdate(newBike._id, { code });
    res.json({ code });
  } catch (error) {
    res.status(500).json({ error: "Adding the bike failed" });
    console.log("Error: ", error.message);
  }
});

module.exports = router;
