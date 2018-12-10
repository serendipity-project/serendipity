const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hostPlaceSchema = new Schema({
  adress: String,
  date:String,
  time:String,
  price:String,
  capacity:Number,
  location: {
    longitude: String,
    latitude: String,
  },
  placeName:String,

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const HostPlace = mongoose.model('HostPlace', hostPlaceSchema);
module.exports = HostPlace;
