const Job = require('../model/job');

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (error) {
    res.status(500).json({
      message: 'Could not load jobs',
      error: error.message,
    });
  }
};

const createJob = async (req, res) => {
  try {
    const {
      title,
      companyName,
      location,
      salaryPackage,
      jobType,
      skillsRequired,
      minimumCgpa,
      passingYear,
      eligibleBranches,
      maxActiveBacklogs,
      deadline,
      description,
    } = req.body;

    if (!title || !companyName) {
      return res.status(400).json({
        message: 'Job title and company name are required',
      });
    }

    const job = await Job.create({
      title,
      companyName,
      location,
      salaryPackage,
      jobType,
      skillsRequired,
      minimumCgpa: minimumCgpa || undefined,
      passingYear: passingYear || undefined,
      eligibleBranches,
      maxActiveBacklogs: maxActiveBacklogs || 0,
      deadline: deadline || undefined,
      description,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: 'Job posted successfully',
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not post job',
      error: error.message,
    });
  }
};

module.exports = {
  getJobs,
  createJob,
};