const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: String,
    technology: String,
    description: String,
    githubLink: String,
  },
  { _id: false }
);

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    personalDetails: {
      address: String,
      linkedIn: String,
      github: String,
    },
    academicInfo: {
      university: String,
      course: String,
      branch: String,
      cgpa: Number,
      passingYear: Number,
      activeBacklogs: {
        type: Number,
        default: 0,
      },
    },
    skills: [String],
    projects: [projectSchema],
    certifications: [String],
    resume: {
      title: String,
      url: String,
      publicId: String,
      uploadedAt: Date,
    },
    placementStatus: {
      type: String,
      enum: ['not_applied', 'applied', 'shortlisted', 'interview', 'selected', 'placed'],
      default: 'not_applied',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', studentSchema);
