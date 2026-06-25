const express = require('express');
const { createCompany, getCompanies } = require('../controller/companycontroller');
const { protect, allowRoles } = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/', protect, getCompanies);
router.post('/', protect, allowRoles('recruiter', 'tpo', 'admin'), createCompany);

module.exports = router;