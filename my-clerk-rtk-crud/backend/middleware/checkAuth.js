// middleware/checkAuth.js
/**
 * Middleware to ensure the request is authenticated via Clerk.
 * It uses Clerk's `getAuth(req)` helper to read the userId from the request (set by clerkMiddleware).
 *
 * If authenticated, it attaches req.user = { id, sessionId, ... } and calls next().
 * Otherwise returns 401.
 *
 * NOTE: The clerk middleware (app.use(clerkMiddleware())) must be applied before this.
 */

const { getAuth } = require('@clerk/express');

module.exports = function checkAuth(req, res, next) {
  try {
    const auth = getAuth(req); // { userId, sessionId, ... } if present
    if (!auth || !auth.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Attach user info to req.user for convenience
    req.user = {
      id: auth.userId,
      sessionId: auth.sessionId || null,
      // You can add more claims from auth if you need them
    };

    return next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({ message: 'Auth verification failed' });
  }
};
