const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
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
    resumeUrl: String,
    eligibilityResult: {
      isEligible: {
        type: Boolean,
        default: false,
      },
      reasons: [String],
    },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'assessment', 'interview', 'selected', 'rejected', 'placed'],
      default: 'applied',
    },
    notes: String,
  },
  { timestamps: true }
);

applicationSchema.index({ student: 1, job: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);