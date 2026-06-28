const express = require('express');
const {
  suggestChatReply,
  generateInterviewQuestions,
  generateResumeFeedback,
  generateCareerRoadmap,
} = require('../controller/googleaicontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.post('/suggest-reply', protect, suggestChatReply);
router.post('/interview-questions', protect, generateInterviewQuestions);
router.post('/resume-feedback', protect, generateResumeFeedback);
router.post('/career-roadmap', protect, generateCareerRoadmap);

module.exports = router;