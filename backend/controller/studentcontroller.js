const Student = require('../model/student');

const getStudentProfile = async (req, res) => {
  try {
    let profile = await Student.findOne({ user: req.user._id }).populate(
      'user',
      'name email phone role department'
    );

    if (!profile) {
      profile = await Student.create({
        user: req.user._id,
      });

      profile = await Student.findOne({ user: req.user._id }).populate(
        'user',
        'name email phone role department'
      );
    }

    res.json({ profile });
  } catch (error) {
    res.status(500).json({
      message: 'Could not load profile',
      error: error.message,
    });
  }
};

const saveStudentProfile = async (req, res) => {
  try {
    const profile = await Student.findOneAndUpdate(
      { user: req.user._id },
      {
        user: req.user._id,
        address: req.body.address,
        linkedIn: req.body.linkedIn,
        github: req.body.github,
        university: req.body.university,
        course: req.body.course,
        branch: req.body.branch,
        cgpa: req.body.cgpa || undefined,
        passingYear: req.body.passingYear || undefined,
        activeBacklogs: req.body.activeBacklogs || 0,
        skills: req.body.skills,
        certifications: req.body.certifications,
        resumeTitle: req.body.resumeTitle,
        resumeUrl: req.body.resumeUrl,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      message: 'Profile saved successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not save profile',
      error: error.message,
    });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate('user', 'name email phone role department')
      .sort({ createdAt: -1 });

    res.json({ students });
  } catch (error) {
    res.status(500).json({
      message: 'Could not load students',
      error: error.message,
    });
  }
};

module.exports = {
  getStudentProfile,
  saveStudentProfile,
  getAllStudents,
};