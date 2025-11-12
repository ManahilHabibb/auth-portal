const express = require('express');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { 
  handleMessage, 
  getAllMessages,
  getMessageById 
} = require('../controllers/messageController');

const router = express.Router();

// Protected routes - require authentication
router.post('/', ClerkExpressRequireAuth(), handleMessage);

// Debug routes (in a real app, these would be protected or removed in production)
if (process.env.NODE_ENV !== 'production') {
  router.get('/debug', ClerkExpressRequireAuth(), getAllMessages);
  router.get('/debug/:id', ClerkExpressRequireAuth(), getMessageById);
}

module.exports = router;
