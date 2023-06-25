const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// get all trips from database
const getAllTrips = async (req, res) => {
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
const getTripById = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id) || req.params.id === undefined) {
      res.status(400).json('Must use a valid trip id to find a trip.');
    }
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
const createTrip = async (req, res) => {
  try {
    const trip = {
      location: req.body.location,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      numPeople: req.body.numPeople,
      totalCost: req.body.totalCost,
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
        .json(response.error || 'An error occurred while creating the trip!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// update trip by id in the database
const updateTrip = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid trip id to update a trip.');
    }
    const tripId = new ObjectId(req.params.id);
    const trip = {
      location: req.body.location,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      numPeople: req.body.numPeople,
      totalCost: req.body.totalCost,
      activities: req.body.activities
    };
    const response = await mongodb
      .getDb()
      .db('planner')
      .collection('trips')
      .replaceOne({ _id: tripId }, trip);
    console.log(response);
    if (response.modifiedCount === 1) {
      console.log('Updated successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(204).json(response).send;
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred while updating the trip!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// delete contact by id in the database
const deleteTrip = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid trip id to delete a trip.');
    }
    const tripId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('planner')
      .collection('trips')
      .deleteOne({ _id: tripId });
    if (response.deletedCount === 1) {
      console.log('Deleted successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response).send;
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred while deleting the trip!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTrip,
  deleteTrip
};
