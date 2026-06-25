const express = require('express');
const {
  getCompanies,
  createCompany,
} = require('../controller/companycontroller');
const { protect } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', protect, getCompanies);
router.post('/', protect, createCompany);

module.exports = router;