const { clerkClient } = require('@clerk/clerk-sdk-node');

const handleMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { userId } = req.auth;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'A valid message is required' });
    }

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Get user details from Clerk
    const user = await clerkClient.users.getUser(userId);
    const username = user.username || user.firstName || 'User';
    const email = user.emailAddresses[0]?.emailAddress || 'No email';

    // Process the message (this is where you'd add your business logic)
    const timestamp = new Date().toISOString();
    const reply = `Hello ${username}, you said: "${message}" at ${new Date(timestamp).toLocaleString()}`;

    // Log the message (in a real app, you might save this to a database)
    console.log(`[${timestamp}] Message from ${username} (${email}): ${message}`);

    res.status(200).json({ 
      success: true, 
      message: 'Message processed successfully', 
      data: { 
        originalMessage: message, 
        reply,
        user: {
          id: userId,
          username,
          email
        },
        timestamp
      }
    });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to process message',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

module.exports = { handleMessage };
