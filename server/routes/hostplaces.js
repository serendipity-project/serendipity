const express = require('express');

const hostPlaceRouter = express.Router();
const HostPlace = require('../models/HostPlace');
const User = require('../models/User');

hostPlaceRouter.post('/new', (req, res, next) => {
  const {
    hostPlaceID, hostID, address, date, price, capacity, initialTime, finishingTime, placeName, location,
  } = req.body;
  const newPlace = new HostPlace({
    hostPlaceID, hostID, address, date, price, capacity, initialTime, finishingTime, placeName, location,
  });
  newPlace.save()
    .then((newPlaceCreated) => {
      res.status(200).json(newPlaceCreated);
      return newPlaceCreated._id;
    })
    .then((hostPlaceCreatedID) => {
      console.log('host place id', hostPlaceCreatedID);

      User.findByIdAndUpdate(req.user.id, { $set: { hostPlaceID: hostPlaceCreatedID } }, { new: true })
        .then(user => console.log('hostPlace ID updated in user Schema', user))
        .catch(e => console.log('hostPlace ID error updating in user Schema', e));
    })
    .catch((err) => {
      res.status(500).json({
        messsage: 'Error while creating new location',
      });
      console.log(err);
    });
});

hostPlaceRouter.get('/filtered', (req, res, next) => {
  const { date } = req.body
  console.log(date);

  HostPlace.find({ date })
    // console.log(req.body.date)
    .then(placesFilteredByDate => {
      res.status(200).json({ placesFilteredByDate })
      console.log(placesFilteredByDate)
    })
    .catch(e => {
      res.status(500).json({ e })
      console.log(e)
    })
})

hostPlaceRouter.get('/all', (req, res, next) => {
  HostPlace.find()
    .then((hostPlace) => {
      res.status(200).json({ hostPlace });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error finding all hosts' places", err });
    });
});

hostPlaceRouter.get('/:hostId', (req, res, next) => {
  HostPlace.findOne({ hostID: req.params.hostId })
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
