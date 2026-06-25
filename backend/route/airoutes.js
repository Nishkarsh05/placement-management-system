const express = require('express');
const { getAiInsights } = require('../controller/aicontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/insights', protect, getAiInsights);

module.exports = router;