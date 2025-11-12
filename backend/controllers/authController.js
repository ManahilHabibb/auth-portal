const { clerkClient } = require('@clerk/clerk-sdk-node');

const getProfile = async (req, res) => {
  try {
    const { userId } = req.auth;

    if (!userId) {
      return res.status(401).json({ message: 'User authentication required' });
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const primaryEmail = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses?.[0]?.emailAddress ?? '';

    res.status(200).json({
      user: {
        id: user.id,
        username: user.username,
        email: primaryEmail,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch profile data' });
  }
};

module.exports = {
  getProfile,
};
