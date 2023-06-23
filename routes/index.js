const router = require('express').Router();
const authenticator = require('../middleware/authenticate');
const { auth, requiresAuth } = require('express-openid-connect');

router.use(auth(authenticator.config));

// Use Authenticate
router.use('/', require('./authenticate'));

// Use Swagger
router.use('/', requiresAuth(), require('./swagger'));

// Use Trips
router.use('/trips', requiresAuth(), require('./trips'));

// Use wishlists
router.use('/wishlists', requiresAuth(), require('./wishlists'));

module.exports = router;
