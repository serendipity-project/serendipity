const express = require('express');

const hostPlaceRouter = express.Router();
const HostPlace = require('../models/HostPlace');

hostPlaceRouter.post('/new', (req, res, next) => {
  const {
    address, date, price, capacity, initialTime, finishingTime, placeName, location,
  } = req.body;
  /*   if (address === '' || date === '' || price === '' || capacity === '' || initialTime === '' || finishingTime === '' || placeName === '') {
    res.status(500).json({
      message: 'Provide all the neccessary information',
    });
    return;
  } */
  const newPlace = new HostPlace({
    address, date, price, capacity, initialTime, finishingTime, placeName, location,
  });
  newPlace.save()
    .then(() => {
      res.status(200).json(newPlace);
    })
    .catch((err) => {
      res.status(500).json({
        messsage: 'Error while creating new location',
      });
      console.log(err);
    });
});

hostPlaceRouter.get('/all', (req, res, next) => {
  HostPlace.find()
    .then((hostPlace) => {
      res.status(200).json({ hostPlace });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding all hosts' places" });
    });
});

hostPlaceRouter.get('/:id', (req, res, next) => {
  HostPlace.findById({ _id: req.params.id })
    .then((hostPlace) => {
      res.status(200).json({ hostPlace });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding own host's place" });
    });
});

hostPlaceRouter.post('/:id/edit', (req, res, next) => {
  const update = {
    address, date, price, capacity, initialTime, finishingTime, placeName,
  } = req.body;
  for (key in update) {
    if (update[key] == '') {
      delete update[key];
    }
  }
  HostPlace.findByIdAndUpdate({ _id: req.params.id }, {
    address, date, price, capacity, initialTime, finishingTime, placeName,
  }, {
    new: true,
  })
    .then((hostPlaceUpdated) => {
      res.status(200).json({ hostPlaceUpdated });
    })
    .catch((err) => {
      res.status(500).json({ messsage: "Host's place wasn't updated" });
      // console.log(err)
    });
});

hostPlaceRouter.post('/:id/availabilty', (req, res, next) => {
  HostPlace.findByIdAndUpdate({
    _id: req.params.id,
  }, {
    $set: { availability: false },
  }, {
    new: true,
  })
    .then(() => {
      res.status(200).json({ message: 'Changed availability to false' });
    })
    .catch((err) => {
      res.status(500).json({ meessage: "Availability didn't change" });
    });
});

hostPlaceRouter.get('/:id/delete', (req, res, next) => {
  HostPlace.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'Location deleted' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Problem deleting location' });
      // console.log(err)
    });
});
module.exports = hostPlaceRouter;
