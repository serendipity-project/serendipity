const express = require('express');

const requestRouter = express.Router();
const Request = require('../models/Request');
const HostPlace = require("../models/HostPlace")

requestRouter.post("/new/:IDmusician", (req, res, next) => {
    const newRequest = new Request({ musicianID: req.params.IDmusician })
    newRequest.save()
        .then(() => {
            HostPlace.findByIdAndUpdate({ _id: req.params.id }, {
                $push: {
                    concertRequest: request._id
                }
            }, {
                    new: true
                })
                .then((requestCreated) => {
                    res.status(200).json({ message: "Request created correctly" })
                    console.log(requestCreated)
                })
        })
        .catch((e) => {
            res.status(500).json({
                messsage: "Request wasn't created",
            });
            console.log(e);
        });

})
requestRouter.get("/:id", (req, res, next) => {
    Request.findById({ _id: req.params.id })
        .populate("musicianID")
        .then((request) => {
            res.status(200).json({ message: "Request with musician's info populated" })
            // console.log(request);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error finding one particular request" })
        })
})

requestRouter.get("/:id", (req, res, next) => {
    HostPlace.findById(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Shows requests for this host's place" })
        })
        .catch(() => {
            res.status(500).json({ message: "Cannot show requests for this host's place" })
        })
})

requestRouter.get("/:id/delete", (req, res, next) => {
    Request.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Request rejected/accepted deleted" })
        })
        .catch((err) => {
            res.status(500).json({ message: "Problem rejecting/accepting request" })
            //console.log(err)
        })
})

module.exports = requestRouter;