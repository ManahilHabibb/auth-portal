const express = require('express');
const router = express.Router();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

const { getProfile } = require('../controllers/authController');

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user's profile
 * @access  Private
 * @returns {Object} User profile data
 */
router.get('/profile', ClerkExpressRequireAuth(), getProfile);

// Webhook endpoint for Clerk
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  // Clerk will send webhook events here
  // You can handle user.created, user.updated, etc. events
  const event = req.body;
  
  console.log('Received webhook event:', event.type);
  
  // Process the webhook event
  switch (event.type) {
    case 'user.created':
      console.log('User created:', event.data);
      // Handle user creation in your database
      break;
      
    case 'user.updated':
      console.log('User updated:', event.data);
      // Handle user updates in your database
      break;
      
    case 'user.deleted':
      console.log('User deleted:', event.data);
      // Handle user deletion in your database
      break;
      
    default:
      console.log('Unhandled event type:', event.type);
  }
  
  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

// Public route to get basic app info
router.get('/info', (req, res) => {
  res.status(200).json({
    name: 'Auth Portal API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
