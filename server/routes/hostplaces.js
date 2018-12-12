/* const express = require('express');
const hostPlaceRouter = express.Router();
const HostPlace = require('../models/HostPlace');

hostPlaceRouter.post("/new-place", (req, res, next) => {
    const { address, date, price, capacity, initialTime, finishingTime, placeName } = req.body
    if (address === '' || date === '' || price === '' || capacity === '' || initialTime === '' || finishingTime === '' || placeName === '') {
        res.status(500).json({
            message: 'Provide all the neccessary information',
        });
        return;
    }
    const newPlace = new HostPlace({ address, date, price, capacity, initialTime, finishingTime, placeName })
    newPlace.save()
        .then(() => {
            res.status(200).json(newPlace)
        })
        .catch(() => {
            res.status(500).json({
                messsage: 'Saving mew location in database went wrong.'
            })
        })
})

hostPlaceRouter.post("/edit", (req, res, next) => {
    const { address, date, price, capacity, initialTime, finishingTime, placeName } = req.body
    for (key in update) {
        if (update[key] == '') {
            delete update[key]
        }
    }
    
})
*/