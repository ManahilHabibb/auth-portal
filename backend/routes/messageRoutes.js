const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const { handleMessage } = require('../controllers/messageController');

const router = express.Router();

router.post('/', authenticateToken, handleMessage);

module.exports = router;
