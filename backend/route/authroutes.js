const express = require('express');
const { getMe, login, register } = require('../controller/authcontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;