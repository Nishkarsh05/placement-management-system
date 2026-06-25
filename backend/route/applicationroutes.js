const express = require('express');
const {
  getApplications,
  createApplication,
} = require('../controller/applicationcontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', protect, getApplications);
router.post('/', protect, createApplication);

module.exports = router;