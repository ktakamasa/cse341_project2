const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// get all trips from database
const getAllTrips = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db('planner')
      .collection('trips')
      .find();
    result.toArray().then((trips) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(trips);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single trip from database
const getTripById = async (req, res, next) => {
  try {
    const tripId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('planner')
      .collection('trips')
      .find({ _id: tripId });
    result.toArray().then((trips) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(trips[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create new trip
const createTrip = async (req, res, next) => {
  try {
    const trip = {
      location: req.body.location,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      numPeople: req.body.numPeople,
      totalCost: req.body.cost,
      activities: req.body.activities
    };

    const response = await mongodb
      .getDb()
      .db('planner')
      .collection('trips')
      .insertOne(trip);
    if (response.acknowledged) {
      console.log('Created successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred! Trip not created!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = { getAllTrips, getTripById, createTrip };
