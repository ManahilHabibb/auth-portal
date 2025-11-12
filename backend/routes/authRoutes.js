const express = require('express');
const router = express.Router();
const { clerkClient } = require('@clerk/clerk-sdk-node');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

/**
 * @route   GET /api/auth/profile
 * @desc    Get current user's profile
 * @access  Private
 * @returns {Object} User profile data
 */
router.get('/profile', ClerkExpressRequireAuth(), async (req, res, next) => {
  try {
    const { userId } = req.auth;
    
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await clerkClient.users.getUser(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.emailAddresses?.[0]?.emailAddress,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.status(200).json(profile);
  } catch (error) {
    console.error('Profile fetch error:', error);
    next(error);
  }
});

// Webhook endpoint for Clerk
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  try {
    // Clerk will send webhook events here
    // You can handle user.created, user.updated, etc. events
    const event = req.body;
    
    // Verify the webhook signature here if needed
    // const evt = clerkClient.webhooks.verifyWebhook({
    //   payload: req.body,
    //   header: req.headers,
    //   secret: process.env.CLERK_WEBHOOK_SECRET
    // });
    
    console.log('Received webhook event:', event);
    
    // Process the event
    if (event.type === 'user.created') {
      console.log('New user created:', event.data);
      // Handle new user creation in your database
    } else if (event.type === 'user.updated') {
      console.log('User updated:', event.data);
      // Handle user updates in your database
    } else if (event.type === 'user.deleted') {
      console.log('User deleted:', event.data);
      // Handle user deletion in your database
    }
    
    // Respond quickly to prevent timeouts
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook error' });
  }
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
