const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const musicianShema = new Schema({
  artistData: String,
  originCity:String,
  musicStyle:String,
  instruments:String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const HostPlace = mongoose.model('HostPlace', musicianShema);
module.exports = HostPlace;
