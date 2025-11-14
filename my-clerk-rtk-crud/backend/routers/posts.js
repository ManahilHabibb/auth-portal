// routers/posts.js
const express = require('express');
const Post = require('../models/Post');
const checkAuth = require('../middleware/checkAuth');
const { getUser } = require('../api/clerk');

const router = express.Router();

// Public: fetch recent posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(200);
    res.json(posts);
  } catch (err) {
    console.error('GET /api/posts error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Public: get single
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) {
    console.error('GET /api/posts/:id error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/* Protected routes start here */
router.post('/', checkAuth, async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    // Optionally fetch user info to populate authorName
    const user = await getUser(req.user.id);
    const authorName = user ? (user.firstName || user.username || user.fullName || '') : '';

    const newPost = new Post({
      title,
      body: body || '',
      authorId: req.user.id,
      authorName
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error('POST /api/posts error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', checkAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.authorId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    const { title, body } = req.body;
    if (title !== undefined) post.title = title;
    if (body !== undefined) post.body = body;
    post.updatedAt = new Date();

    await post.save();
    res.json(post);
  } catch (err) {
    console.error('PUT /api/posts/:id error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', checkAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.authorId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await post.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /api/posts/:id error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
