// backend/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: String,
  name: String,
  bio: String,
  content: String,
  image: String,
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
