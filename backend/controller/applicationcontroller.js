const Application = require('../model/application');
const Job = require('../model/job');

const getApplications = async (req, res) => {
  try {
    const filter = req.user.role === 'student' ? { student: req.user._id } : {};

    const applications = await Application.find(filter)
      .populate('student', 'name email department')
      .populate('job')
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error) {
    res.status(500).json({
      message: 'Could not load applications',
      error: error.message,
    });
  }
};

const createApplication = async (req, res) => {
  try {
    const { jobId, coverNote } = req.body;

    if (!jobId) {
      return res.status(400).json({
        message: 'Job id is required',
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
      });
    }

    const existingApplication = await Application.findOne({
      student: req.user._id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(409).json({
        message: 'You already applied for this job',
      });
    }

    const application = await Application.create({
      student: req.user._id,
      job: jobId,
      coverNote,
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not submit application',
      error: error.message,
    });
  }
};

module.exports = {
  getApplications,
  createApplication,
};