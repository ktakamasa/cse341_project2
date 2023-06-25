const express = require('express');
const router = express.Router();
const wishlistsController = require('../controllers/wishlists');
const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

// GET all wishlists
router.get('/', wishlistsController.getAllWishlists);

// GET a single wishlist
router.get('/:id', wishlistsController.getWishlistById);

// POST a new wishlist
router.post(
  '/',
  requiresAuth(),
  validation.saveWishlist,
  wishlistsController.createWishlist
);

// PUT update data in an existing wishlist
router.put(
  '/:id',
  requiresAuth(),
  validation.saveWishlist,
  wishlistsController.updateWishlist
);

// DELETE a wishlist
router.delete('/:id', requiresAuth(), wishlistsController.deleteWishlist);

module.exports = router;
