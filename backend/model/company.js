const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    industry: String,
    website: String,
    location: String,
    description: String,
    hrName: String,
    hrEmail: String,
    hrPhone: String,
    logoText: String,
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', companySchema);