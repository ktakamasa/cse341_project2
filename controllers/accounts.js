const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// get all accounts from database
const getAllAccounts = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db('planner')
      .collection('accounts')
      .find();
    result.toArray().then((accounts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(accounts);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single accounts from database
const getAccountById = async (req, res, next) => {
  try {
    const accountId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('planner')
      .collection('accounts')
      .find({ _id: accountId });
    result.toArray().then((accounts) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(accounts[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create new account
const createAccount = async (req, res, next) => {
  try {
    const accounts = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };

    const response = await mongodb
      .getDb()
      .db('planner')
      .collection('accounts')
      .insertOne(accounts);
    if (response.acknowledged) {
      console.log('Created successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred! Account not created!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = { getAllAccounts, getAccountById, createAccount };
