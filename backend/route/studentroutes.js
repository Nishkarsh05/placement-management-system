const express = require('express');
const {
  getStudents,
  getMyProfile,
  updateMyProfile,
} = require('../controller/studentcontroller');
const { protect, allowRoles } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', protect, allowRoles('recruiter', 'tpo', 'admin'), getStudents);
router.get('/profile', protect, getMyProfile);
router.put('/profile', protect, updateMyProfile);

module.exports = router;