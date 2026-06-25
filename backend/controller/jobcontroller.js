const Job = require('../model/job');

const toList = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return value.split(',').map((item) => item.trim()).filter(Boolean);
};

const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user._id,
      skillsRequired: toList(req.body.skillsRequired),
      eligibility: {
        minimumCGPA: Number(req.body.minimumCGPA),
        passingYear: Number(req.body.passingYear),
        branches: toList(req.body.branches),
        maxActiveBacklogs: Number(req.body.maxActiveBacklogs || 0),
      },
    });

    const populatedJob = await job.populate('company', 'name industry location');

    res.status(201).json({
      message: 'Job posted successfully',
      job: populatedJob,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to post job', error: error.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('company', 'name industry location')
      .populate('postedBy', 'name email role')
      .sort({ createdAt: -1 });

    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs', error: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', 'name industry website location description hrContact')
      .populate('postedBy', 'name email role');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ job });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch job', error: error.message });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
};