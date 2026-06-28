const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./model/user');
const Student = require('./model/student');
const Company = require('./model/company');
const Job = require('./model/job');
const Application = require('./model/application');
const Message = require('./model/message');

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placement-management';

const createUserIfMissing = async ({ name, email, password, phone, role, department }) => {
  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      password,
      phone,
      role,
      department,
    });
  }

  return user;
};

const seedDemo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    await Company.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});
    await Message.deleteMany({});

    const student = await createUserIfMissing({
      name: 'Student Demo',
      email: 'student@test.com',
      password: '123456',
      phone: '9000000001',
      role: 'student',
      department: 'CSE',
    });

    const recruiter = await createUserIfMissing({
      name: 'Recruiter Demo',
      email: 'recruiter@test.com',
      password: '123456',
      phone: '9000000002',
      role: 'recruiter',
      department: 'HR',
    });

    await createUserIfMissing({
      name: 'TPO Demo',
      email: 'tpo@test.com',
      password: '123456',
      phone: '9000000003',
      role: 'tpo',
      department: 'Placement Cell',
    });

    await createUserIfMissing({
      name: 'Admin Demo',
      email: 'admin@test.com',
      password: '123456',
      phone: '9000000004',
      role: 'admin',
      department: 'Administration',
    });

    await Student.findOneAndUpdate(
      { user: student._id },
      {
        user: student._id,
        university: 'Sharda University',
        course: 'B.Tech',
        branch: 'CSE',
        cgpa: 8.2,
        passingYear: 2026,
        activeBacklogs: 0,
        skills: 'React, Node.js, MongoDB, JavaScript',
        certifications: 'MERN Stack Certification',
        resumeTitle: 'MERN Stack Resume',
        resumeUrl: 'https://example.com/resume.pdf',
      },
      { upsert: true, new: true }
    );

    const companyData = [
      ['TCS', 'IT Services', 'Mumbai', 'https://www.tcs.com', 'hr@tcs.com'],
      ['Infosys', 'Technology Consulting', 'Bangalore', 'https://www.infosys.com', 'hr@infosys.com'],
      ['Wipro', 'IT Services', 'Bangalore', 'https://www.wipro.com', 'campus@wipro.com'],
      ['Accenture', 'Consulting and Technology', 'Bangalore', 'https://www.accenture.com', 'campus@accenture.com'],
      ['Deloitte', 'Consulting', 'Hyderabad', 'https://www.deloitte.com', 'campus@deloitte.com'],
      ['Amazon', 'Cloud and Ecommerce', 'Hyderabad', 'https://www.amazon.jobs', 'campus@amazon.com'],
      ['Microsoft', 'Software and Cloud', 'Hyderabad', 'https://careers.microsoft.com', 'campus@microsoft.com'],
      ['Google', 'Software and AI', 'Bangalore', 'https://careers.google.com', 'campus@google.com'],
      ['IBM', 'Cloud and Consulting', 'Pune', 'https://www.ibm.com/careers', 'campus@ibm.com'],
      ['Capgemini', 'Technology Consulting', 'Pune', 'https://www.capgemini.com', 'campus@capgemini.com'],
      ['Cognizant', 'IT Services', 'Chennai', 'https://www.cognizant.com', 'campus@cognizant.com'],
      ['HCLTech', 'IT Services', 'Noida', 'https://www.hcltech.com', 'campus@hcltech.com'],
    ];

    await Company.insertMany(
      companyData.map(([name, industry, location, website, hrEmail]) => ({
        name,
        industry,
        website,
        location,
        description: `${name} is a recruiting partner for campus placement drives.`,
        hrName: 'Campus Hiring Team',
        hrEmail,
        hrPhone: '9999999999',
        logoText: name.charAt(0),
        createdBy: recruiter._id,
      }))
    );

    const jobData = [
      ['Frontend Developer', 'TCS', 'Bangalore', '6 LPA', 'React, JavaScript, CSS', 6.5, 'CSE, IT'],
      ['MERN Stack Intern', 'Infosys', 'Pune', '25K/month', 'React, Node.js, MongoDB', 7, 'CSE, IT'],
      ['Java Developer', 'Wipro', 'Bangalore', '5.5 LPA', 'Java, Spring Boot, SQL', 6.5, 'CSE, IT, ECE'],
      ['Business Analyst', 'Deloitte', 'Hyderabad', '7 LPA', 'Excel, SQL, Communication', 7, 'CSE, IT, MBA'],
      ['Cloud Support Associate', 'Amazon', 'Hyderabad', '8 LPA', 'Linux, Networking, Cloud', 7, 'CSE, IT, ECE'],
      ['Software Engineer', 'Microsoft', 'Hyderabad', '18 LPA', 'DSA, JavaScript, System Design', 8, 'CSE, IT'],
      ['Data Analyst', 'Accenture', 'Bangalore', '6.5 LPA', 'Python, SQL, Power BI', 6.8, 'CSE, IT, ECE'],
      ['AI Intern', 'Google', 'Bangalore', '40K/month', 'Python, Machine Learning, Data Structures', 8.5, 'CSE, IT'],
      ['Cyber Security Analyst', 'IBM', 'Pune', '7.5 LPA', 'Networking, Linux, Security', 7, 'CSE, IT'],
      ['Full Stack Developer', 'Capgemini', 'Mumbai', '6 LPA', 'React, Node.js, Express, MongoDB', 6.5, 'CSE, IT'],
      ['Graduate Engineer Trainee', 'Cognizant', 'Chennai', '4.5 LPA', 'Java, SQL, Aptitude', 6, 'CSE, IT, ECE'],
      ['Backend Developer', 'HCLTech', 'Noida', '6 LPA', 'Node.js, Express, MongoDB', 6.5, 'CSE, IT'],
    ];

    const createdJobs = await Job.insertMany(
      jobData.map(([title, companyName, location, salaryPackage, skillsRequired, minimumCgpa, eligibleBranches]) => ({
        title,
        companyName,
        location,
        salaryPackage,
        jobType: title.includes('Intern') ? 'Internship' : 'Full Time',
        skillsRequired,
        minimumCgpa,
        passingYear: 2026,
        eligibleBranches,
        maxActiveBacklogs: 0,
        deadline: new Date('2026-12-31'),
        description: `${title} role at ${companyName}. Required skills: ${skillsRequired}.`,
        createdBy: recruiter._id,
      }))
    );

    await Application.create({
      student: student._id,
      job: createdJobs[0]._id,
      status: 'applied',
      coverNote: 'Interested in this role.',
    });

    await Message.create({
      sender: student._id,
      receiver: recruiter._id,
      message: 'Hello, I am interested in the Frontend Developer role. Could you share interview details?',
    });

    await Message.create({
      sender: recruiter._id,
      receiver: student._id,
      message: 'Sure. Please complete your profile and upload your resume before the screening round.',
    });

    console.log('Seed completed successfully');
    console.log('Demo accounts:');
    console.log('student@test.com / 123456');
    console.log('recruiter@test.com / 123456');
    console.log('tpo@test.com / 123456');
    console.log('admin@test.com / 123456');

    await mongoose.disconnect();
  } catch (error) {
    console.log('Seed failed:', error.message);
    await mongoose.disconnect();
  }
};

seedDemo();