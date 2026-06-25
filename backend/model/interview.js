const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    roundName: String,
    interviewDate: Date,
    mode: {
      type: String,
      enum: ['online', 'offline'],
      default: 'online',
    },
    meetingLink: String,
    venue: String,
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    feedback: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Interview', interviewSchema);