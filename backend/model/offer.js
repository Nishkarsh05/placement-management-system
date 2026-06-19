const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
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
    role: {
      type: String,
      required: true,
    },
    package: String,
    joiningDate: Date,
    offerLetterUrl: String,
    status: {
      type: String,
      enum: ['released', 'accepted', 'declined'],
      default: 'released',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Offer', offerSchema);
