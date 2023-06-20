const router = require('express').Router();

// Use Swagger
router.use('/', require('./swagger'));

// Use Trips
router.use('/trips', require('./trips'));

module.exports = router;
