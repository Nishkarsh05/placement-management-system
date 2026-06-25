const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    location: String,
    salaryPackage: String,
    jobType: {
      type: String,
      default: 'Full Time',
    },
    skillsRequired: String,
    minimumCgpa: Number,
    passingYear: Number,
    eligibleBranches: String,
    maxActiveBacklogs: {
      type: Number,
      default: 0,
    },
    deadline: Date,
    description: String,
    status: {
      type: String,
      enum: ['open', 'closed'],
      default: 'open',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);