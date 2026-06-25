const express = require('express');
const { suggestChatReply } = require('../controller/googleaicontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/suggest-reply', protect, suggestChatReply);

module.exports = router;