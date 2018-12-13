const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hostPlaceSchema = new Schema({
  address: String,
  date: { type: Date, required: true },
  initialTime: String,
  finishingTime: String,
  price: Number,
  capacity: Number,
  location: {
    longitude: Number,
    latitude: Number,
  },
  placeName: String,
  availability: { type: Boolean, default: true },
  concertRequest: [{ type: Schema.Types.ObjectId, ref: 'Request' }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const HostPlace = mongoose.model('HostPlace', hostPlaceSchema);
module.exports = HostPlace;
