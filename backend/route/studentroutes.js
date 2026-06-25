const express = require('express');
const {
  getStudentProfile,
  saveStudentProfile,
  getAllStudents,
} = require('../controller/studentcontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/profile', protect, getStudentProfile);
router.post('/profile', protect, saveStudentProfile);
router.get('/', protect, getAllStudents);

module.exports = router;