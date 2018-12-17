const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const concertSchema = new Schema({
  musicianID: { type: Schema.Types.ObjectId, ref: 'Musician' },
  hostID: { type: Schema.Types.ObjectId, ref: 'HostPlace' }, // ESTO ES HOSTPLACEID!!!!!
  capacity: { type: Number, default: 0, min: 0 },
  availability: { type: Boolean, default: true },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Concert = mongoose.model('Concert', concertSchema);
module.exports = Concert;
