const express = require('express');

const requestRouter = express.Router();
const Request = require('../models/Request');
const HostPlace = require('../models/HostPlace');

requestRouter.post('/new/:IDmusician', (req, res, next) => {
  const newRequest = new Request({ musicianID: req.params.IDmusician });
  newRequest.save()
    .then((requestCreated) => {
      res.status(200).json({ message: 'Request created correctly' });
      console.log(requestCreated);
      return requestCreated._id;
    })
    .then((requestCreatedID) => {
      console.log(`${req.body.hostID} host ID dewsde el front`, requestCreatedID);
      HostPlace.findByIdAndUpdate(req.body.hostID, { $push: { concertRequest: requestCreatedID } },
        { new: true }).then((place) => {
        console.log(place);
      }).catch((e) => { console.log('error', e); });
    })

    .catch((e) => {
      res.status(500).json({
        messsage: "Request wasn't created",
      });
      console.log(e);
    });
});

requestRouter.get('/:id', (req, res, next) => {
  Request.findById({ _id: req.params.id })
    .populate('musicianID')
    .then((request) => {
      res.status(200).json({ request,  message: "Request with musician's info populated" });
      // console.log(request);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error finding one particular request' });
    });
});

requestRouter.get('/all/:hostID', (req, res, next) => {
  HostPlace.findOne({ hostID:req.params.hostID })
    .populate('concertRequest')
    .then((myrequests) => {
      res.status(200).json({ myrequests, message: "Shows requests for this host's place" });
    })
    .catch(() => {
      res.status(500).json({ message: "Cannot show requests for this host's place" });
    });
});

requestRouter.get('/:id/delete', (req, res, next) => {
  Request.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'Request rejected/accepted deleted' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Problem rejecting/accepting request' });
      // console.log(err)
    });
});

module.exports = requestRouter;
