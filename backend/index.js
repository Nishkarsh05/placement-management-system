const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./route/authroutes');
const studentRoutes = require('./route/studentroutes');
const companyRoutes = require('./route/companyroutes');
const jobRoutes = require('./route/jobroutes');
const applicationRoutes = require('./route/applicationroutes');
const aiRoutes = require('./route/airoutes');
const messageRoutes = require('./route/messageroutes');
const googleAiRoutes = require('./route/googleairoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Placement Management API is running' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'placement-management-api',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/google-ai', googleAiRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/placement-management';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection failed:', error.message);
  });