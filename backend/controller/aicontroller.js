const Student = require('../model/student');
const Job = require('../model/job');

const splitSkills = (skills) => {
  if (!skills) return [];

  return skills
    .split(',')
    .map((skill) => skill.trim().toLowerCase())
    .filter(Boolean);
};

const calculateProfileScore = (profile) => {
  if (!profile) return 30;

  let score = 20;

  if (profile.cgpa) score += 15;
  if (profile.skills) score += 20;
  if (profile.resumeUrl) score += 15;
  if (profile.linkedIn) score += 10;
  if (profile.github) score += 10;
  if (profile.certifications) score += 10;

  return Math.min(score, 100);
};

const getAiInsights = async (req, res) => {
  try {
    const profile = await Student.findOne({ user: req.user._id });
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(10);

    const studentSkills = splitSkills(profile?.skills);

    const recommendedJobs = jobs.map((job) => {
      const jobSkills = splitSkills(job.skillsRequired);
      const matchedSkills = jobSkills.filter((skill) => studentSkills.includes(skill));
      const matchValue = jobSkills.length
        ? Math.round((matchedSkills.length / jobSkills.length) * 100)
        : 50;

      return {
        title: job.title,
        company: job.companyName,
        match: `${Math.max(matchValue, 45)}%`,
        reason: matchedSkills.length
          ? `Matches your skills: ${matchedSkills.join(', ')}`
          : 'Add more skills in your profile to improve matching',
      };
    });

    res.json({
      profileScore: calculateProfileScore(profile),
      topSkill: studentSkills[0] || 'MERN Stack',
      recommendedJobs,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not load AI insights',
      error: error.message,
    });
  }
};

module.exports = {
  getAiInsights,
};