const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    package: String,
    location: String,
    experience: String,
    jobType: {
      type: String,
      enum: ['full_time', 'internship', 'ppo', 'remote', 'hybrid'],
      default: 'full_time',
    },
    skillsRequired: [String],
    eligibility: {
      minimumCGPA: Number,
      passingYear: Number,
      branches: [String],
      maxActiveBacklogs: { type: Number, default: 0 },
    },
    description: String,
    deadline: Date,
    status: {
      type: String,
      enum: ['draft', 'open', 'closed'],
      default: 'open',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);