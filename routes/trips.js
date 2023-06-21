const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// GET all trips
router.get('/', tripsController.getAllTrips);

// GET a single trip
router.get('/:id', tripsController.getTripById);

// POST a new trip
router.post('/', tripsController.createTrip);

// PUT update data in an existing trip
router.put('/:id', tripsController.updateTrip);

// DELETE a trip
router.delete('/:id', tripsController.deleteTrip);

module.exports = router;
