const express = require('express');
const {
  applyToJob,
  getAllApplications,
  getMyApplications,
  updateApplicationStatus,
} = require('../controller/applicationcontroller');
const { protect, allowRoles } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/', protect, allowRoles('student'), applyToJob);
router.get('/my', protect, allowRoles('student'), getMyApplications);
router.get('/', protect, allowRoles('recruiter', 'tpo', 'admin'), getAllApplications);
router.patch('/:id/status', protect, allowRoles('recruiter', 'tpo', 'admin'), updateApplicationStatus);

module.exports = router;