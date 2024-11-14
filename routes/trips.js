const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');

// GET all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific trip
router.get('/:id', getTrip, (req, res) => {
  res.json(res.trip);
});

// POST a new trip
router.post('/', async (req, res) => {
  const trip = new Trip({
    name: req.body.name,
    destination: req.body.destination,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description
  });

  try {
    const newTrip = await trip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT to update a trip
router.put('/:id', getTrip, async (req, res) => {
  if (req.body.name != null) {
    res.trip.name = req.body.name;
  }
  if (req.body.destination != null) {
    res.trip.destination = req.body.destination;
  }
  if (req.body.startDate != null) {
    res.trip.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.trip.endDate = req.body.endDate;
  }
  if (req.body.description != null) {
    res.trip.description = req.body.description;
  }

  try {
    const updatedTrip = await res.trip.save();
    res.json(updatedTrip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a trip
router.delete('/:id', getTrip, async (req, res) => {
  try {
    await res.trip.remove();
    res.json({ message: 'Deleted Trip' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to find a trip by ID
async function getTrip(req, res, next) {
  let trip;
  try {
    trip = await Trip.findById(req.params.id);
    if (trip == null) {
      return res.status(404).json({ message: 'Cannot find trip' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.trip = trip;
  next();
}


module.exports = router;
