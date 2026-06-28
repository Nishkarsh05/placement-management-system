const User = require('../model/user');
const Student = require('../model/student');

const getStudents = async (req, res) => {
  try {
    const users = await User.find({ role: 'student' })
      .select('-password')
      .sort({ createdAt: -1 });

    const profiles = await Student.find({
      user: { $in: users.map((user) => user._id) },
    });

    const profileMap = profiles.reduce((map, profile) => {
      map[String(profile.user)] = profile;
      return map;
    }, {});

    const students = users.map((user) => ({
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      department: user.department,
      profile: profileMap[String(user._id)] || {},
    }));

    res.json({ students });
  } catch (error) {
    res.status(500).json({ message: 'Could not load students' });
  }
};

const getMyProfile = async (req, res) => {
  try {
    let profile = await Student.findOne({ user: req.user._id });

    if (!profile) {
      profile = await Student.create({ user: req.user._id });
    }

    res.json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Could not load profile' });
  }
};

const updateMyProfile = async (req, res) => {
  try {
    const profile = await Student.findOneAndUpdate(
      { user: req.user._id },
      { ...req.body, user: req.user._id },
      { new: true, upsert: true }
    );

    res.json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Could not update profile' });
  }
};

module.exports = {
  getStudents,
  getMyProfile,
  updateMyProfile,
};