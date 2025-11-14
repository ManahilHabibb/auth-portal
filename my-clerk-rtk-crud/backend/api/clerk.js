// api/clerk.js
/**
 * A tiny wrapper for Clerk functions we might need.
 * We import clerk client utilities from @clerk/express; if you need
 * the full clerk SDK instead, swap imports accordingly.
 *
 * This file centralizes potential Clerk calls (like fetching user info).
 */

const { clerkClient } = require('@clerk/express'); // clerkClient provided by @clerk/express

/**
 * Get a user object (safe wrapper).
 * @param {string} userId
 */
async function getUser(userId) {
  if (!userId) return null;
  try {
    const user = await clerkClient.users.getUser(userId);
    return user;
  } catch (err) {
    console.warn('Failed to fetch user from Clerk:', err?.message ?? err);
    return null;
  }
}

module.exports = { getUser };
