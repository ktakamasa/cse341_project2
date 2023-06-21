const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const validation = require('../middleware/validate');

// GET all trips
router.get('/', tripsController.getAllTrips);

// GET a single trip
router.get('/:id', tripsController.getTripById);

// POST a new trip
router.post('/', validation.saveTrip, tripsController.createTrip);

// PUT update data in an existing trip
router.put('/:id', validation.saveTrip, tripsController.updateTrip);

// DELETE a trip
router.delete('/:id', tripsController.deleteTrip);

module.exports = router;
