const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema({
  musicianID: { type: Schema.Types.ObjectId, ref: "Musician" }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  });

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;