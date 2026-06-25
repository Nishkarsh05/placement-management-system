const express = require('express');
const { createJob, getJobById, getJobs } = require('../controller/jobcontroller');
const { protect, allowRoles } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', protect, getJobs);
router.get('/:id', protect, getJobById);
router.post('/', protect, allowRoles('recruiter', 'tpo', 'admin'), createJob);

module.exports = router;