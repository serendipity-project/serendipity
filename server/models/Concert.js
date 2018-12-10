const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const concertSchema = new Schema({
  adress: String,
  date:String,
  time:String,
  price:String,
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

const Concert = mongoose.model('Concert', concertSchema);
module.exports = Concert;
