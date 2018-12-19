const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
  email: String,
  host: {
    type: Boolean,
    default: false,
  },
  musician: {
    type: Boolean,
    default: false,
  },
  musicianID: String,
  hostPlaceID: String,
  concerts: [{ type: Schema.Types.ObjectId, ref: 'Concert' }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
