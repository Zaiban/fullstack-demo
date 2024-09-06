var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Bike = require('../models/bike');

/* GET bikes listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a bike');
});


// ADD bike
router.post('/add', async (req, res) => {
    const { brand, model, purchaseDate } = req.body;
    try {
        const newBike = new Bike({ brand, model, purchaseDate });
        await newBike.save();
        res.json(newBike);
    } catch (error) {
        res.status(500).json({ error: 'Adding the bike failed' });
    }
});

module.exports = router;
