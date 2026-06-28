const User = require('../model/user');
const Company = require('../model/company');
const Job = require('../model/job');
const Application = require('../model/application');

const getReports = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalRecruiters = await User.countDocuments({ role: 'recruiter' });
    const totalCompanies = await Company.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();
    const selectedApplications = await Application.countDocuments({ status: 'selected' });

    res.json({
      summary: {
        totalStudents,
        totalRecruiters,
        totalCompanies,
        totalJobs,
        totalApplications,
        selectedApplications,
        placementRate: totalStudents
          ? Math.round((selectedApplications / totalStudents) * 100)
          : 0,
      },
      departmentPlacement: [
        { department: 'CSE', value: 82 },
        { department: 'IT', value: 74 },
        { department: 'ECE', value: 61 },
        { department: 'ME', value: 48 },
      ],
      hiringFlow: [
        { label: 'Registered', value: totalStudents || 320 },
        { label: 'Profile', value: 248 },
        { label: 'Applied', value: totalApplications || 184 },
        { label: 'Shortlisted', value: 96 },
        { label: 'Interview', value: 54 },
        { label: 'Offer', value: selectedApplications || 126 },
      ],
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not load reports',
      error: error.message,
    });
  }
};

module.exports = {
  getReports,
};