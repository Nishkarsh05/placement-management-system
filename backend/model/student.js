const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    address: String,
    linkedIn: String,
    github: String,
    university: String,
    course: String,
    branch: String,
    cgpa: Number,
    passingYear: Number,
    activeBacklogs: {
      type: Number,
      default: 0,
    },
    skills: String,
    certifications: String,
    resumeTitle: String,
    resumeUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);