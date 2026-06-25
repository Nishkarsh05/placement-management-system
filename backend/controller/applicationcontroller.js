const Application = require('../model/application');
const Job = require('../model/job');
const Student = require('../model/student');

const normalize = (value) => String(value || '').trim().toLowerCase();

const checkEligibility = (student, job) => {
  const reasons = [];
  const academic = student.academicInfo || {};
  const eligibility = job.eligibility || {};

  if (eligibility.minimumCGPA && Number(academic.cgpa) < Number(eligibility.minimumCGPA)) {
    reasons.push(`Minimum CGPA required is ${eligibility.minimumCGPA}`);
  }

  if (eligibility.passingYear && Number(academic.passingYear) !== Number(eligibility.passingYear)) {
    reasons.push(`Passing year must be ${eligibility.passingYear}`);
  }

  if (eligibility.branches?.length) {
    const studentBranch = normalize(academic.branch);
    const allowedBranches = eligibility.branches.map(normalize);

    if (!allowedBranches.includes(studentBranch)) {
      reasons.push(`Eligible branches: ${eligibility.branches.join(', ')}`);
    }
  }

  if (
    eligibility.maxActiveBacklogs !== undefined &&
    Number(academic.activeBacklogs || 0) > Number(eligibility.maxActiveBacklogs)
  ) {
    reasons.push(`Maximum active backlogs allowed: ${eligibility.maxActiveBacklogs}`);
  }

  if (job.skillsRequired?.length) {
    const studentSkills = (student.skills || []).map(normalize);
    const requiredSkills = job.skillsRequired.map(normalize);
    const hasSkillMatch = requiredSkills.some((skill) => studentSkills.includes(skill));

    if (!hasSkillMatch) {
      reasons.push(`At least one required skill needed: ${job.skillsRequired.join(', ')}`);
    }
  }

  return {
    isEligible: reasons.length === 0,
    reasons,
  };
};

const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: 'Job ID is required' });
    }

    const student = await Student.findOne({ user: req.user._id });

    if (!student) {
      return res.status(404).json({ message: 'Please complete your student profile first' });
    }

    const job = await Job.findById(jobId).populate('company');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const existingApplication = await Application.findOne({
      student: student._id,
      job: job._id,
    });

    if (existingApplication) {
      return res.status(409).json({ message: 'You already applied for this job' });
    }

    const eligibilityResult = checkEligibility(student, job);

    const application = await Application.create({
      student: student._id,
      job: job._id,
      company: job.company._id,
      resumeUrl: student.resume?.url,
      eligibilityResult,
      status: eligibilityResult.isEligible ? 'applied' : 'rejected',
      notes: eligibilityResult.isEligible ? 'Eligible application' : 'Rejected by eligibility check',
    });

    const populatedApplication = await Application.findById(application._id)
      .populate({
        path: 'student',
        populate: {
          path: 'user',
          select: 'name email phone department',
        },
      })
      .populate('job', 'title package location jobType')
      .populate('company', 'name industry location');

    res.status(201).json({
      message: eligibilityResult.isEligible
        ? 'Application submitted successfully'
        : 'You are not eligible for this job',
      application: populatedApplication,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to apply for job', error: error.message });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user._id });

    if (!student) {
      return res.json({ applications: [] });
    }

    const applications = await Application.find({ student: student._id })
      .populate('job', 'title package location jobType')
      .populate('company', 'name industry location')
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate({
        path: 'student',
        populate: {
          path: 'user',
          select: 'name email phone department',
        },
      })
      .populate('job', 'title package location jobType')
      .populate('company', 'name industry location')
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applications', error: error.message });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      'applied',
      'shortlisted',
      'assessment',
      'interview',
      'selected',
      'rejected',
      'placed',
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid application status' });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate({
        path: 'student',
        populate: {
          path: 'user',
          select: 'name email phone department',
        },
      })
      .populate('job', 'title package location jobType')
      .populate('company', 'name industry location');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({ message: 'Application status updated', application });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update application', error: error.message });
  }
};

module.exports = {
  applyToJob,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus,
};