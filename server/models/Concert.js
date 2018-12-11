const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const concertSchema = new Schema({
  musiciainID: { type: Schema.Types.ObjectId, ref: "Musician" },
  hostID: { type: Schema.Types.ObjectId, ref: "HostPlace" },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

const Concert = mongoose.model('Concert', concertSchema);
module.exports = Concert;
