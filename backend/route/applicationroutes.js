const express = require('express');
const {
  createApplication,
  getApplications,
  updateApplicationStatus,
  updateCandidateDecision,
} = require('../controller/applicationcontroller');
const { protect, allowRoles } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', protect, getApplications);
router.post('/', protect, allowRoles('student', 'admin'), createApplication);
router.patch('/:id/status', protect, allowRoles('recruiter', 'tpo', 'admin'), updateApplicationStatus);
router.patch('/candidate/:candidateId/decision', protect, allowRoles('recruiter', 'tpo', 'admin'), updateCandidateDecision);

module.exports = router;