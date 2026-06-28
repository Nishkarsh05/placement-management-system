const express = require('express');
const { getReports } = require('../controller/reportcontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', protect, getReports);

module.exports = router;