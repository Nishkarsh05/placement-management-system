const Company = require('../model/company');

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });

    res.json({ companies });
  } catch (error) {
    res.status(500).json({
      message: 'Could not load companies',
      error: error.message,
    });
  }
};

const createCompany = async (req, res) => {
  try {
    const { name, industry, website, location, description, hrName, hrEmail, hrPhone } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Company name is required',
      });
    }

    const company = await Company.create({
      name,
      industry,
      website,
      location,
      description,
      hrName,
      hrEmail,
      hrPhone,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: 'Company added successfully',
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not add company',
      error: error.message,
    });
  }
};

module.exports = {
  getCompanies,
  createCompany,
};