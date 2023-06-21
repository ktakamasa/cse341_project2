const express = require('express');
const router = express.Router();
const wishlistsController = require('../controllers/wishlists');

// GET all wishlists
router.get('/', wishlistsController.getAllWishlists);

// GET a single wishlist
router.get('/:id', wishlistsController.getWishlistById);

// POST a new wishlist
router.post('/', wishlistsController.createWishlist);

// PUT update data in an existing wishlist
router.put('/:id', wishlistsController.updateWishlist);

// DELETE a wishlist
router.delete('/:id', wishlistsController.deleteWishlist);

module.exports = router;
