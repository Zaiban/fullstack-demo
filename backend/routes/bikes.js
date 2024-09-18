var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var crypto = require("crypto");

var Bike = require("../models/Bike");

// A helper function to create a delay
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

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

  if (process.env.NODE_ENV !== "production") {
    await delay(1000); // Simulate delay while in development
  }

  // Check that the code is valid type and length
  if (typeof code !== "string" || code.length !== 6) {
    res.json(null);
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
  console.log('req.body:', req.body)
  const { brand, model, purchaseDate, color, price } = req.body;

  if (process.env.NODE_ENV !== "production") {
    await delay(10000); // 10 sec latency in development mode
  }

  try {
    // Create a mongo Bike model object
    const newBike = new Bike({ brand, model, purchaseDate, color, price });
    // Write data to the database
    await newBike.save();
    // Generate an unique bike code
    const code = generateBikeCode(newBike._id);
    // Save the code also to DB
    await Bike.findByIdAndUpdate(newBike._id, { code });
    // Return the code as a response back to the front-end
    res.json({ code });
  } catch (error) {
    res.status(500).json({ error: "Adding the bike failed" });
    console.log("Error: ", error.message);
  }
});

module.exports = router;
