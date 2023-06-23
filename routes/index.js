const router = require('express').Router();
const authenticator = require('../middleware/authenticate');
const { auth, requiresAuth } = require('express-openid-connect');

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(authenticator.config));

// Use Authenticate
router.use('/', require('./authenticate'));

// Use Swagger
router.use('/', requiresAuth(), require('./swagger'));

// Use Trips
router.use('/trips', requiresAuth(), require('./trips'));

// Use wishlists
router.use('/wishlists', requiresAuth(), require('./wishlists'));

// test
router.get('/test', requiresAuth(), (req, res) => {
  res.send(JSON.stringify('Hello World'));
});

module.exports = router;
