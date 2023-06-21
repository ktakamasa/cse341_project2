const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accounts');

// GET all trips
router.get('/', accountsController.getAllAccounts);

// GET a single trip
router.get('/:id', accountsController.getAccountById);

// POST a new trip
router.post('/', accountsController.createAccount);

module.exports = router;
