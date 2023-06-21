const validator = require('../helpers/validate');

const saveTrip = (req, res, next) => {
  const validationRule = {
    location: 'required|string',
    description: 'required|string',
    startDate: 'required|string',
    endDate: 'required|string',
    numPeople: 'required|integer',
    totalCost: 'required|integer',
    activities: ['string']
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveWishlist = (req, res, next) => {
  const validationRule = {
    location: 'required|string',
    description: 'required|string',
    activities: ['string']
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveTrip,
  saveWishlist
};
