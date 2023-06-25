const router = require('express').Router();
const authenticator = require('../middleware/authenticate');
const { auth } = require('express-openid-connect');

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(authenticator.config));

// Use Authenticate
router.use('/', require('./authenticate'));

// Use Swagger
router.use('/', require('./swagger'));

// Use Trips
router.use('/trips', require('./trips'));

// Use wishlists
router.use('/wishlists', require('./wishlists'));

module.exports = router;
