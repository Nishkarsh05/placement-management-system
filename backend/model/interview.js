const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
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
      required: true,
    },
    type: {
      type: String,
      enum: ['hr', 'technical', 'managerial', 'final'],
      default: 'technical',
    },
    scheduledAt: {
      type: Date,
      required: true,
    },
    interviewer: String,
    meetingLink: String,
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    result: {
      type: String,
      enum: ['pending', 'selected', 'rejected'],
      default: 'pending',
    },
    feedback: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);
