const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const musicianShema = new Schema({
  artistData: String,
  email: String,
  originCity: String,
  musicStyle: [],
  artistDescription: String,
  instruments: [],
  favouritePlayCity: String,
  musicTrack: String,
  spotifyAccount: String,
  youtubeAccount: String,
  image: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Musician = mongoose.model('Musician', musicianShema);
module.exports = Musician;
