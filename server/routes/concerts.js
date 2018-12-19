const express = require('express');

const concertRouter = express.Router();
const Concert = require('../models/Concert');
const HostPlace = require('../models/HostPlace');
const User = require('../models/User');


concertRouter.post('/new/:IDhostPlace/:IDmusician', (req, res, next) => {
  const newConcert = new Concert({ musicianID: req.params.IDmusician, hostID: req.params.IDhostPlace });
  newConcert.save()
    .then((concertCreated) => {
      console.log(concertCreated);
      res.status(200).json({ message: 'Concert created correctly' });
      return concertCreated._id;
    })
    .then((concertID) => {
      const concertId = concertID;
      console.log(req.params.IDhostPlace);
      HostPlace.findByIdAndUpdate(req.params.IDhostPlace, {
        $set: {
          availability: false,
        },
      }, { new: true })
        .then(hostplace => hostplace.capacity)
        .then((hostPlaceCapacity) => {
          Concert.findByIdAndUpdate({ _id: concertId }, {
            $set: {
              capacity: hostPlaceCapacity,
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
    .then((concerts) => {
      res.status(200).json(concerts);
    //  res.status(200).json({ message: 'All concerts' });
      // console.log(concert);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error finding all concerts' });
    });
});


concertRouter.get('/:userID/:concertID', (req, res, next) => {
  User.findById(req.user.userID)
    .then(() => {
      Concert.findById({ _id: req.params.concertID })
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
    })
    .catch((e) => {
      res.status(500).json({ message: 'Error finding concerts for users' });
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
      // console.log(concert.capacity)
      if (concert.capacity <= 0) {
        Concert.findByIdAndUpdate({ _id: req.params.id }, {
          $set: {
            availability: false,
          },
        }, { new: true })
          .populate('musicianID')
          .populate('hostID')
          .then((concert) => {
            console.log(concert);
            res.status(200).json({ message: 'User going to concert', concert });
          })
          .catch(e => console.log(e));
      } else {
        // if () {
        User.findByIdAndUpdate({ _id: req.user.id }, {
          $push: {
            concerts: concert._id,
          },
        }, { new: true })
          .then((concertSaved) => {
            res.status(200).json({ message: concertSaved, concert });
          })
          .catch((e) => {
            res.status(500).json({ message: e });
          });
      }
      // }
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
      if (concert.capacity > 0) {
        Concert.findByIdAndUpdate(req.params.id, {
          $set: {
            availability: true,
          },
        }, { new: true })
          .populate('musicianID')
          .populate('hostID')
          .then((concert) => {
            // res.status(200).json(concert)
            // console.log(req.user.id);

            User.findByIdAndUpdate({ _id: req.user.id }, {
              $pull: {
                concerts: concert._id
              }
            }, { new: true })
              .then((concertSaved) => {
                res.status(200).json({ message: concertSaved, concert })
              })
              .catch((e) => {
                res.status(500).json({ message: e });
              });
          })
          .catch(e => console.log(e));
      } else {
        User.findByIdAndUpdate({ _id: req.user.id }, {
          $pop: {
            concerts: concert._id,
          },
        }, { new: true })
          .then((concertSaved) => {
            res.status(200).json({ message: concertSaved, concert });
          })
          .catch((e) => {
            res.status(500).json({ message: e });
          });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
      // console.log(err);
    });
});
module.exports = concertRouter;
