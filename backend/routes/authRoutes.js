const express = require('express');
const router = express.Router();

const { getProfile } = require('../controllers/authController');

const { authenticateToken } = require('../middleware/authMiddleware');

// Routes
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
