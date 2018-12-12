const express = require('express');

const musicianRouter = express.Router();
const Musician = require('../models/Musician');

musicianRouter.post('/new', (req, res, next) => {
  const {
    artistData,
    originCity,
    musicStyle,
    artistDescription,
    instruments,
    favouritePlayCity,
    musicTrack,
    youtubeAccount,
    image,
  } = req.body;

  const newMusician = new Musician({
    artistData,
    email:req.user.email, // el email lo traemos del propio usuario
    originCity,
    musicStyle,
    artistDescription,
    instruments,
    favouritePlayCity,
    musicTrack,
    youtubeAccount,
    image,
  });
  newMusician.save()
    .then((musicianCreated) => {
      res.status(200).json(musicianCreated);
    })
    .catch((e) => {
      res.status(500).json({
        messsage: 'Not musician created',
      });
      console.log(e);
    });
});
musicianRouter.post('/:id/edit', (req, res, next) => {
  const update = {
    artistData,
    originCity,
    musicStyle,
    artistDescription,
    instruments,
    favouritePlayCity,
    musicTrack,
    youtubeAccount,
    image,
  } = req.body;

  for (key in update) {
    if (update[key] == '') {
      delete update[key];
    }
  }
  Musician.findByIdAndUpdate({ _id: req.params.id }, {
    artistData,
    originCity,
    musicStyle,
    artistDescription,
    instruments,
    favouritePlayCity,
    musicTrack,
    youtubeAccount,
    image,
  }, {
    new: true,
  })
    .then((musicianUpdated) => {
      res.status(200).json({ musicianUpdated });
    })
    .catch((err) => {
      res.status(500).json({ messsage: 'Error Finding Musician' });
      console.log(err);
    });
});

musicianRouter.get('/all', (req, res, next) => {
  Musician.find()
    .then((musician) => {
      res.status(200).json({ musician });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error finding all musicians' });
    });
});

musicianRouter.get('/:id', (req, res, next) => {
  Musician.findById({ _id: req.params.id })
    .then((musician) => {
      res.status(200).json({ musician });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error finding musician' });
    });
});

module.exports   = musicianRouter;
