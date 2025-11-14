// routers/messages.js
const express = require('express');
const Message = require('../models/Message');
const checkAuth = require('../middleware/checkAuth');
const { getUser } = require('../api/clerk');

const router = express.Router();

// Get all messages created by the authenticated user
router.get('/', checkAuth, async (req, res) => {
  try {
    const msgs = await Message.find({ fromUserId: req.user.id }).sort({ createdAt: -1 }).limit(500);
    res.json(msgs);
  } catch (err) {
    console.error('GET /api/messages error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create message (user -> system)
router.post('/', checkAuth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content required' });

    const user = await getUser(req.user.id);
    const fromUserName = user ? (user.firstName || user.username || user.fullName || '') : '';

    const m = new Message({
      content,
      fromUserId: req.user.id,
      fromUserName,
      // optional: generate a simple system response
      systemResponse: `Received your message: "${content.slice(0, 120)}"`
    });

    await m.save();
    res.status(201).json(m);
  } catch (err) {
    console.error('POST /api/messages error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a message (only owner)
router.put('/:id', checkAuth, async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Not found' });
    if (msg.fromUserId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { content } = req.body;
    if (content !== undefined) msg.content = content;
    msg.updatedAt = new Date();

    await msg.save();
    res.json(msg);
  } catch (err) {
    console.error('PUT /api/messages/:id error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a message
router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const msg = await Message.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Not found' });
    if (msg.fromUserId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await msg.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /api/messages/:id error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
