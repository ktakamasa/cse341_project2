const express = require('express');
const router = express.Router();
const wishlistsController = require('../controllers/wishlists');

// GET all trips
router.get('/', wishlistsController.getAllWishlists);

// GET a single trip
router.get('/:id', wishlistsController.getWishlistById);

// POST a new trip
router.post('/', wishlistsController.createWishlist);

module.exports = router;
