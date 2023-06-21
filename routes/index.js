const router = require('express').Router();

// Use Swagger
router.use('/', require('./swagger'));

// Use Trips
router.use('/trips', require('./trips'));

// Use wishlists
router.use('/wishlists', require('./wishlists'));

// Use accounts
router.use('/accounts', require('./accounts'));

module.exports = router;
