const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  bio: String,
  password: String,
  profilePic: { type: String, default: '' }, // ✅ Important
});

module.exports = mongoose.model('User', UserSchema);
