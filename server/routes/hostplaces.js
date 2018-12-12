const express = require('express');
const hostPlaceRouter = express.Router();
const HostPlace = require('../models/HostPlace');

hostPlaceRouter.post("/new-place", (req, res, next) => {
    const { address, date, price, capacity, initialTime, finishingTime, placeName } = req.body
    
    
})
router.post(‘/books/add’, (req, res, next) => {
    const { title, author, description, rating } = req.body;
    const newBook = new Book({ title, author, description, rating})
    newBook.save()
    .then((book) => {
      res.redirect(‘/books’);
    })
    .catch((error) => {
      console.log(error);
    })
   });