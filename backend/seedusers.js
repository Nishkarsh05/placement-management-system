const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./model/user');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placement_management';

const users = [
  {
    name: 'Student Demo',
    email: 'student@test.com',
    phone: '9999999999',
    role: 'student',
    department: 'CSE',
    password: '123456',
  },
  {
    name: 'Recruiter Demo',
    email: 'recruiter@test.com',
    phone: '9999999999',
    role: 'recruiter',
    department: 'HR',
    password: '123456',
  },
  {
    name: 'TPO Demo',
    email: 'tpo@test.com',
    phone: '9999999999',
    role: 'tpo',
    department: 'Placement Cell',
    password: '123456',
  },
  {
    name: 'Admin Demo',
    email: 'admin@test.com',
    phone: '9999999999',
    role: 'admin',
    department: 'Administration',
    password: '123456',
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    for (const userData of users) {
      await User.findOneAndDelete({ email: userData.email });
      await User.create(userData);
      console.log(`Created ${userData.email}`);
    }

    console.log('Demo users created successfully');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();