const { clerkClient } = require('@clerk/clerk-sdk-node');

// In-memory messages store for demo purposes.
const messages = new Map();

/**
 * Handle incoming messages
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
const handleMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ 
        error: 'Message is required and must be a non-empty string' 
      });
    }

    // Get user info from Clerk
    const { userId } = req.auth;
    if (!userId) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await clerkClient.users.getUser(userId);
    const username = user.username || user.firstName || 'Anonymous';

    // Create message with user info
    const newMessage = {
      id: Date.now().toString(),
      text: message.trim(),
      userId,
      username,
      timestamp: new Date().toISOString(),
      reply: `Echo: ${message} (from ${username})`
    };

    // Store message (in-memory for demo)
    messages.set(newMessage.id, newMessage);

    // Return the reply
    res.status(200).json({ 
      success: true,
      reply: newMessage.reply,
      timestamp: newMessage.timestamp
    });
  } catch (error) {
    console.error('Message processing error:', error);
    next(error);
  }
};

/**
 * Get all messages (for debugging)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getAllMessages = (req, res) => {
  res.status(200).json({
    count: messages.size,
    messages: Array.from(messages.values())
  });
};

/**
 * Get a specific message by ID (for debugging)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getMessageById = (req, res) => {
  const { id } = req.params;
  const message = messages.get(id);
  
  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }
  
  res.status(200).json(message);
};

module.exports = {
  handleMessage,
  getAllMessages,
  getMessageById
};
