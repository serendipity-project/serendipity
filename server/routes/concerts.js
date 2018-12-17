const express = require('express');

const concertRouter = express.Router();
const Concert = require('../models/Concert');
const HostPlace = require('../models/HostPlace');


concertRouter.post('/new/:IDhostPlace/:IDmusician', (req, res, next) => {
  const newConcert = new Concert({ musicianID: req.params.IDmusician, hostID: req.params.IDhostPlace });
  newConcert.save()
    .then((concertCreated) => {
      res.status(200).json({ message: 'Concert created correctly' });
      console.log(concertCreated);
      return concertCreated._id;
    })
    .then((concertID) => {
      const concertId = concertID;
      console.log(req.params.IDhostPlace);
      HostPlace.findById(req.params.IDhostPlace)
        .then(hostplace => hostplace.capacity)
        .then((hostPLaceCapacity) => {
          Concert.findByIdAndUpdate({ _id: concertId }, {
            $set: {
              capacity: hostPLaceCapacity,
            },
          }, { new: true })
            .then((capacity) => {
              res.status(200).json({ message: 'Capacity established' });
              console.log(capacity);
            })
            .catch((err) => {
              res.status(500).json({ message: 'Something went wrong while establishing the capacitty' });
              console.log(err);
            });
        })
        .catch(e => console.log(e));
    })
    .catch((e) => {
      res.status(500).json({ message: 'Problem when creating concert' });
    });
});
concertRouter.post('/set-capacity', (req, res, next) => {
  Concert.findByIdAndUpdate({ _id: req.body.idConcert }, {
    $set: {
      capacity: req.body.capacity,
    },
  }, { new: true })
    .then((capacity) => {
      res.status(200).json({ message: 'Capacity established' });
      console.log(capacity);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Something went wrong while establishing the capacitty' });
      console.log(err);
    });
});
concertRouter.get('/all', (req, res, next) => {
  Concert.find()
    .populate('musicianID')
    .populate('hostID')
    .then((concert) => {
      res.status(200).json(concert);
      res.status(200).json({ message: 'All concerts' });
      // console.log(concert);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error finding all concerts' });
    });
});
concertRouter.get('/:id', (req, res, next) => {
  Concert.findById({ _id: req.params.id })
    .populate('musicianID')
    .populate('hostID')
    .then((concert) => {
      res.status(200).json(concert);
      res.status(200).json({ message: "Concert with musician's and host's info populated" });
      // console.log(concert);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error finding one particular concert' });
    });
});
concertRouter.get('/:id/delete', (req, res, next) => {
  Concert.findByIdAndRemove(req.params.id)
    .then((concert) => {
      res.status(200).json({ message: 'Concert deleted', concert });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Problem deleting concert' });
      // console.log(err)
    });
});
concertRouter.post('/:id/going', (req, res, next) => {
  Concert.findOneAndUpdate({ _id: req.params.id },
    { $inc: { capacity: -1 } },
    { new: true })
    .populate('musicianID')
    .populate('hostID')
    .then((concert) => {
      res.status(200).json({ message: 'User going to concert', concert });
      // console.log(capacity);
    })
    .catch((err) => {
      res.status(500).json(err);
      // console.log(err);
    });
});

concertRouter.post('/:id/not-going', (req, res, next) => {
  Concert.findOneAndUpdate({ _id: req.params.id },
    { $inc: { capacity: 1 } },
    { new: true })
    .populate('musicianID')
    .populate('hostID')
    .then((concert) => {
      res.status(200).json({ message: 'User not going to concert', concert });
    })
    .catch((err) => {
      res.status(500).json(err);
      // console.log(err);
    });
});
module.exports = concertRouter;
