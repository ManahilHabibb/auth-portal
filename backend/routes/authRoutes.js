const express = require('express');
const router = express.Router();

const {
  signUpUser,
  signInUser,
  getProfile,
  logoutUser
} = require('../controllers/authController');

const { authenticateToken } = require('../middleware/authMiddleware');

// Routes
router.post('/signup', signUpUser);
router.post('/signin', signInUser);
router.get('/profile', authenticateToken, getProfile);
router.post('/logout', authenticateToken, logoutUser);

module.exports = router;
