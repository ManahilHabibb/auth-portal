// models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  fromUserId: { type: String, required: true },
  fromUserName: { type: String, default: '' },
  systemResponse: { type: String, default: '' }, // optional system reply
  createdAt: { type: Date, default: () => new Date() },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Message', MessageSchema);
