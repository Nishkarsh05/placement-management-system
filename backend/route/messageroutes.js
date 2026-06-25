const express = require('express');
const {
  getChatUsers,
  getMessages,
  sendMessage,
} = require('../controller/messagecontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/users', protect, getChatUsers);
router.get('/:userId', protect, getMessages);
router.post('/', protect, sendMessage);

module.exports = router;