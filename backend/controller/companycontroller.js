const Company = require('../model/company');

const createCompany = async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: 'Company added successfully', company });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add company', error: error.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.json({ companies });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch companies', error: error.message });
  }
};

module.exports = {
  createCompany,
  getCompanies,
};