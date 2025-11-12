const { requireAuth } = require('@clerk/clerk-sdk-node');

const authenticateToken = requireAuth();

module.exports = { authenticateToken };
