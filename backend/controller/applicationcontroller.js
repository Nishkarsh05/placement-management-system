const Application = require('../model/application');

const getApplications = async (req, res) => {
  const query = {};

  if (req.user.role === 'student') {
    query.student = req.user._id;
  }

  const applications = await Application.find(query)
    .populate('student', 'name email phone department')
    .populate('job', 'title location jobType skills minCgpa branches')
    .populate('company', 'name industry location website hrName hrEmail');

  res.json({ applications });
};

const createApplication = async (req, res) => {
  const { job, company } = req.body;

  const existing = await Application.findOne({
    student: req.user._id,
    job,
  });

  if (existing) {
    return res.status(409).json({ message: 'You already applied for this job' });
  }

  const application = await Application.create({
    student: req.user._id,
    job,
    company,
  });

  res.status(201).json({ application });
};

const updateApplicationStatus = async (req, res) => {
  const { status, recruiterNote, interviewDate } = req.body;

  const application = await Application.findByIdAndUpdate(
    req.params.id,
    {
      ...(status ? { status } : {}),
      ...(recruiterNote !== undefined ? { recruiterNote } : {}),
      ...(interviewDate ? { interviewDate } : {}),
    },
    { new: true }
  )
    .populate('student', 'name email phone department')
    .populate('job', 'title location jobType')
    .populate('company', 'name industry location');

  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }

  res.json({ application });
};

const updateCandidateDecision = async (req, res) => {
  const { decisionStatus } = req.body;

  const allowed = ['New', 'Reviewed', 'Shortlisted', 'Interview', 'Selected', 'Rejected'];
  if (!allowed.includes(decisionStatus)) {
    return res.status(400).json({ message: 'Invalid decision status' });
  }

  const statusMap = {
    New: 'Applied',
    Reviewed: 'Reviewed',
    Shortlisted: 'Shortlisted',
    Interview: 'Interview',
    Selected: 'Selected',
    Rejected: 'Rejected',
  };

  const application = await Application.findOneAndUpdate(
    { student: req.params.candidateId },
    { status: statusMap[decisionStatus] },
    { new: true }
  );

  if (!application) {
    return res.json({
      message: 'No application found for this candidate yet. Frontend demo decision can still show.',
      decisionStatus,
    });
  }

  res.json({ application, decisionStatus });
};

module.exports = {
  getApplications,
  createApplication,
  updateApplicationStatus,
  updateCandidateDecision,
};