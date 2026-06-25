const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./model/user');
const Company = require('./model/company');
const Job = require('./model/job');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placement-management';

const seedDemo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    let recruiter = await User.findOne({ email: 'recruiter@test.com' });

    if (!recruiter) {
      recruiter = await User.create({
        name: 'Recruiter Demo',
        email: 'recruiter@test.com',
        password: '123456',
        phone: '9999999999',
        role: 'recruiter',
        department: 'HR',
      });
    }

    await Company.deleteMany({});
    await Job.deleteMany({});

    await Company.insertMany([
      {
        name: 'TCS',
        industry: 'IT Services',
        website: 'https://www.tcs.com',
        location: 'Bangalore',
        description: 'Technology consulting and services company',
        hrName: 'Rahul HR',
        hrEmail: 'hr@tcs.com',
        hrPhone: '9999999999',
        createdBy: recruiter._id,
      },
      {
        name: 'Infosys',
        industry: 'Technology',
        website: 'https://www.infosys.com',
        location: 'Pune',
        description: 'Digital services and consulting company',
        hrName: 'Priya HR',
        hrEmail: 'hr@infosys.com',
        hrPhone: '8888888888',
        createdBy: recruiter._id,
      },
      {
        name: 'Amazon',
        industry: 'Cloud and Ecommerce',
        website: 'https://www.amazon.jobs',
        location: 'Hyderabad',
        description: 'Cloud, ecommerce, and technology company',
        hrName: 'Campus Team',
        hrEmail: 'campus@amazon.com',
        hrPhone: '7777777777',
        createdBy: recruiter._id,
      },
    ]);

    await Job.insertMany([
      {
        title: 'Frontend Developer',
        companyName: 'TCS',
        location: 'Bangalore',
        salaryPackage: '6 LPA',
        jobType: 'Full Time',
        skillsRequired: 'React, JavaScript, CSS',
        minimumCgpa: 6.5,
        passingYear: 2026,
        eligibleBranches: 'CSE, IT',
        maxActiveBacklogs: 0,
        description: 'Build responsive web applications using React.',
        createdBy: recruiter._id,
      },
      {
        title: 'MERN Stack Intern',
        companyName: 'Infosys',
        location: 'Pune',
        salaryPackage: '25K/month',
        jobType: 'Internship',
        skillsRequired: 'React, Node.js, MongoDB',
        minimumCgpa: 7,
        passingYear: 2026,
        eligibleBranches: 'CSE, IT',
        maxActiveBacklogs: 1,
        description: 'Work on full-stack web development projects.',
        createdBy: recruiter._id,
      },
      {
        title: 'Cloud Support Associate',
        companyName: 'Amazon',
        location: 'Hyderabad',
        salaryPackage: '8 LPA',
        jobType: 'Full Time',
        skillsRequired: 'Linux, Networking, Cloud',
        minimumCgpa: 7,
        passingYear: 2026,
        eligibleBranches: 'CSE, IT, ECE',
        maxActiveBacklogs: 0,
        description: 'Support cloud customers and troubleshoot technical issues.',
        createdBy: recruiter._id,
      },
    ]);

    console.log('Demo data added successfully');
    console.log('Recruiter login: recruiter@test.com / 123456');
    await mongoose.disconnect();
  } catch (error) {
    console.log('Seed failed:', error.message);
    await mongoose.disconnect();
  }
};

seedDemo();