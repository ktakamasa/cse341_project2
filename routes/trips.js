const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');
const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

// GET all trips
router.get('/', tripsController.getAllTrips);

// GET a single trip
router.get('/:id', tripsController.getTripById);

// POST a new trip
router.post(
  '/',
  requiresAuth(),
  validation.saveTrip,
  tripsController.createTrip
);

// PUT update data in an existing trip
router.put(
  '/:id',
  requiresAuth(),
  validation.saveTrip,
  tripsController.updateTrip
);

// DELETE a trip
router.delete('/:id', requiresAuth(), tripsController.deleteTrip);

module.exports = router;
