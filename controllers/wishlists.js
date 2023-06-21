const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// get all wishlists from database
const getAllWishlists = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDb()
      .db('planner')
      .collection('wishlists')
      .find();
    result.toArray().then((wishlists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(wishlists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a single wishlists from database
const getWishlistById = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid wishlist id to find a wishlist.');
    }
    const wishlistId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('planner')
      .collection('wishlists')
      .find({ _id: wishlistId });
    result.toArray().then((wishlists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(wishlists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create new wishlist
const createWishlist = async (req, res, next) => {
  try {
    const wishlists = {
      location: req.body.location,
      description: req.body.description,
      activities: req.body.activities
    };

    const response = await mongodb
      .getDb()
      .db('planner')
      .collection('wishlists')
      .insertOne(wishlists);
    if (response.acknowledged) {
      console.log('Created successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(response.error || 'An error occurred! Wishlist not created!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// update wishlist by id in the database
const updateWishlist = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(400)
        .json('Must use a valid wishlist id to update a wishlist.');
    }
    const wishlistId = new ObjectId(req.params.id);
    const wishlist = {
      location: req.body.location,
      description: req.body.description,
      activities: req.body.activities
    };
    const response = await mongodb
      .getDb()
      .db('planner')
      .collection('wishlists')
      .replaceOne({ _id: wishlistId }, wishlist);
    console.log(response);
    if (response.modifiedCount === 1) {
      console.log('Updated successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(204).json(response).send;
    } else {
      res.status(500).json(response.error || 'An error occurred!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// delete contact by id in the database
const deleteWishlist = async (req, res, next) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(400)
        .json('Must use a valid wishlist id to delete a wishlist.');
    }
    const wishlistId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db('planner')
      .collection('wishlists')
      .deleteOne({ _id: wishlistId });
    if (response.deletedCount === 1) {
      console.log('Deleted successfully');
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(response).send;
    } else {
      res.status(500).json(response.error || 'An error occurred!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllWishlists,
  getWishlistById,
  createWishlist,
  updateWishlist,
  deleteWishlist
};
