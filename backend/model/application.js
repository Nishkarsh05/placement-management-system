const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
    },
    status: {
      type: String,
      enum: ['Applied', 'Reviewed', 'Shortlisted', 'Interview', 'Selected', 'Rejected'],
      default: 'Applied',
    },
    recruiterNote: {
      type: String,
      trim: true,
    },
    interviewDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);