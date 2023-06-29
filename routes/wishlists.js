const express = require('express');
const router = express.Router();
const wishlistsController = require('../controllers/wishlists');
const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');
const { isAuthenticated } = require('../middleware/authenticate');

// GET all wishlists
router.get('/', wishlistsController.getAllWishlists);

// GET a single wishlist
router.get('/:id', wishlistsController.getWishlistById);

// POST a new wishlist
router.post(
  '/',
  requiresAuth(),
  isAuthenticated,
  validation.saveWishlist,
  wishlistsController.createWishlist
);

// PUT update data in an existing wishlist
router.put(
  '/:id',
  requiresAuth(),
  isAuthenticated,
  validation.saveWishlist,
  wishlistsController.updateWishlist
);

// DELETE a wishlist
router.delete(
  '/:id',
  requiresAuth(),
  isAuthenticated,
  wishlistsController.deleteWishlist
);

module.exports = router;
