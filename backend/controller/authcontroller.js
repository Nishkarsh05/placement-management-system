const jwt = require('jsonwebtoken');
const User = require('../model/user');

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'dev_secret_change_me', {
    expiresIn: '7d',
  });
};

const sendAuthResponse = (res, user, statusCode = 200) => {
  const token = createToken(user._id);

  res.status(statusCode).json({
    message: 'Authentication successful',
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department,
    },
  });
};

const register = async (req, res) => {
  try {
    const { name, email, phone, role, department, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({
      name,
      email,
      phone,
      role,
      department,
      password,
    });

    sendAuthResponse(res, user, 201);
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: 'This account is disabled' });
    }

    sendAuthResponse(res, user);
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const getMe = async (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
      role: req.user.role,
      department: req.user.department,
    },
  });
};

module.exports = {
  register,
  login,
  getMe,
};