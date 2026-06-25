const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Application',
      required: true,
    },
    packageOffered: String,
    joiningLocation: String,
    joiningDate: Date,
    status: {
      type: String,
      enum: ['offered', 'accepted', 'declined'],
      default: 'offered',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Offer', offerSchema);