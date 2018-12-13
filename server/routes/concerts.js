const express = require('express');

const concertRouter = express.Router();
const Concert = require('../models/Concert');


concertRouter.post("/new/:IDhost/:IDmusician", (req, res, next) => {
    const newConcert = new Concert({ musicianID: req.params.IDmusician, hostID: req.params.IDhost })
    newConcert.save()
        .then((concertCreated) => {
            res.status(200).json({ message: "Concert created correctly" })
            // console.log(concertCreated);
        })
        .catch((e) => {
            res.status(500).json({ message: "Problem when creating concert" })
        })
})
concertRouter.post("/set-capacity", (req, res, next) => {
    Concert.findByIdAndUpdate({ _id: req.body.idConcert }, {
        $set: {
            capacity: req.body.capacity
        }
    }, { new: true })
        .then((capacity) => {
            res.status(200).json({ message: "Capacity established" })
            console.log(capacity);
        })
        .catch((err) => {
            res.status(500).json({ message: "Something went wrong while establishing the capacitty" })
            console.log(err);
        })
})
concertRouter.get("/:id", (req, res, next) => {
    Concert.findById({ _id: req.params.id })
        .populate("musicianID")
        .populate("hostID")
        .then((concert) => {
            res.status(200).json(concert)
            res.status(200).json({ message: "Concert with musician's and host's info populated" })
            // console.log(concert);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error finding one particular concert" })
        })
})
concertRouter.get("/:id/delete", (req, res, next) => {
    Concert.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(200).json({ message: "Concert deleted" })
        })
        .catch((err) => {
            res.status(500).json({ message: "Problem deleting concert" })
            //console.log(err)
        })
})
concertRouter.post("/:id/going", (req, res, next) => {
    Concert.findOneAndUpdate({ _id: req.params.id },
        { $inc: { capacity: -1 } },
        { new: true })
        .then((capacity) => {
            res.status(200).json({ message: "User going to concert", capacity })
            // console.log(capacity);
        })
        .catch((err) => {
            res.status(500).json(err)
            // console.log(err);
        })
})

concertRouter.post("/:id/not-going", (req, res, next) => {
    Concert.findOneAndUpdate({ _id: req.params.id },
        { $inc: { capacity: 1 } },
        { new: true })
        .then((capacity) => {
            res.status(200).json({ message: "User not going to concert", capacity })
            // console.log(capacity);
        })
        .catch((err) => {
            res.status(500).json(err)
            // console.log(err);
        })
})
module.exports = concertRouter;