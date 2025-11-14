// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, default: '' },
  authorId: { type: String, required: true },     // Clerk user id
  authorName: { type: String, default: '' },
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Post', PostSchema);
