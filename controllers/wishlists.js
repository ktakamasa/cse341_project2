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

module.exports = { getAllWishlists, getWishlistById, createWishlist };
