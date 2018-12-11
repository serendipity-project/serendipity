const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const musicianShema = new Schema({
  artistData: String,
  email: { type: Schema.Types.email, ref: "User" },
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

const HostPlace = mongoose.model('HostPlace', musicianShema);
module.exports = HostPlace;
