const express = require('express');

const musicianRouter = express.Router();
const Musician = require('../models/Musician');
const User = require('../models/User');
const parser = require('../configs/cloudinary');

musicianRouter.post('/new', parser.single('file'), (req, res, next) => {
  const {
    artistData,
    originCity,
    musicStyle,
    artistDescription,
    instruments,
    favouritePlayCity,
    musicTrack,
    spotifyAccount,
    youtubeAccount,
  } = req.body;
  if (req.file) {
    image = req.file.url;
  }

  const newMusician = new Musician({
    artistData,
    email: req.user.email, // el email lo traemos del propio usuario
    originCity,
    musicStyle,
    artistDescription,
    instruments,
    favouritePlayCity,
    musicTrack,
    spotifyAccount,
    youtubeAccount,
    image,
  });
  newMusician.save()
    .then((musicianCreated) => {
      res.status(200).json(musicianCreated);
      return musicianCreated._id;
    })
    .then((musicianCreatedID) => {
      User.findByIdAndUpdate(req.user.id, { $set:{ musicianID:musicianCreatedID } }, { new:true })
        .then(user => console.log('Musician ID updated in user Schema', user))
        .catch(e => console.log('Musician ID error updating in user Schema', e));
    })
    .catch((e) => {
      res.status(500).json({
        messsage: 'Not musician created',
      });
      console.log(e);
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
musicianRouter.post('/:id/edit', parser.single('image'), (req, res, next) => {
  const update = {
    artistData,
    originCity,
    musicStyle,
    artistDescription,
    instruments,
    favouritePlayCity,
    musicTrack,
    spotifyAccount,
    youtubeAccount,
  } = req.body;
  if (req.file) {
    update.image = req.file.url;
  }


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
    spotifyAccount,
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

musicianRouter.get('/:id/delete', (req, res, next) => {
  Musician.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'Musician deleted' });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Problem deleting Musician' });
      // console.log(err)
    });
});


module.exports = musicianRouter;
